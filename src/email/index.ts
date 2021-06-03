import * as path from 'path';
import * as fs from 'fs/promises';
import { compile } from 'handlebars';
import { createTransport, SendMailOptions } from 'nodemailer';
import mjml2html from 'mjml';
import { Logger } from 'winston';
import {
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_FROM,
} from '../env';

type TemplateName = 'ban-appeal' | 'verification';
type MailOptions = Omit<SendMailOptions, 'html'>;
export type Mailer = <TemplateData>(
  templateName: TemplateName,
  mailOptions: MailOptions,
  templateData: TemplateData,
) => Promise<void>;

export default async function createMailer(logger: Logger): Promise<Mailer> {
  const transports = createTransport({
    secure: true,
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const templates = await fs.readdir(__dirname)
    .then((files) => Promise.all(files
      .filter((file) => file.endsWith('.hbs'))
      .map((file) => fs.readFile(file)
        .then(compile)
        .then((template) => ({
          template,
          name: file
            .replace(/^.+\//, '')
            .replace(/\.hbs$/, '') as TemplateName,
        })))));

  return async <TemplateData>(
    templateName: TemplateName,
    mailOptions: MailOptions,
    templateData: TemplateData,
  ): Promise<void> => {
    const template = templates.find(({ name }) => name === templateName)?.template;
    if (!template) throw new Error(`Could not find template '${templateName}'.`);

    await transports.sendMail({
      from: EMAIL_FROM,
      ...mailOptions,
      html: mjml2html(template(templateData)).html,
    })
      .catch((ex) => {
        logger.error('Could not send email: ', ex);
        return Promise.reject(ex);
      });
  };
}
