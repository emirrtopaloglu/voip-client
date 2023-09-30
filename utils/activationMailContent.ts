export default function getActivationMail(
  fullName: string,
  activationLink: string
): string {
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>E-mail Doğrulama</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@@500&family=Roboto:wght@@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <table style="font-family: Roboto; font-size: 14px">
          <tr>
            <td
              style="
                padding-top: 24px;
                line-height: 20px;
                padding-left: 15px;
                font-family: 'Inter', sans-serif;
              "
            >
              Merhaba, <strong>${fullName}</strong> <br />
              Üyeliğinizi tamamlamak için aşağıdaki linkten aktivasyon işlemini
              gerçekleştirmeniz gerekmektedir.
            </td>
          </tr>
          <tr>
            <td style="padding-left: 15px; padding-top: 50px">
              <a
                href="${activationLink}"
                target="_blank"
                style="
                  background: #0786e7;
                  color: #fff;
                  padding: 15px 50px;
                  border-radius: 4px;
                  font-size: 16px;
                  font-weight: 500;
                  text-decoration: none;
                  font-family: 'Inter', sans-serif;
                "
                >Üyeliğini Doğrula</a
              >
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
  return "";
}
