import { Request, Response } from "express";
import { connectToDatabase } from "./db";

const errorTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
    />
    <title>Something went wrong</title>
  </head>
  <body>
    <style type="text/css">
      body {
        background: #e8d1db;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }

      #error {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        height: 100vh;
        align-items: center;
      }

      p {
        padding-top: 30px;
        font-size: 11px;
        text-align: center;
      }

      strong {
        font-weight: 700;
      }


      svg {
        max-width: 45vw;
        max-height: 45vw;
      }
    </style>

    <div id="error">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="500px"
          height="500px"
        >
          <radialGradient
            id="IkUh6ey5BhnCh~hrMs1fda"
            cx="32.5"
            cy="31.5"
            r="30.516"
            gradientUnits="userSpaceOnUse"
            spreadMethod="reflect"
          >
            <stop offset="0" stop-color="#afeeff" />
            <stop offset=".193" stop-color="#bbf1ff" />
            <stop offset=".703" stop-color="#d7f8ff" />
            <stop offset="1" stop-color="#e1faff" />
          </radialGradient>
          <path
            fill="url(#IkUh6ey5BhnCh~hrMs1fda)"
            d="M59,20h1.5c2.168,0,3.892-1.998,3.422-4.243C63.58,14.122,62.056,13,60.385,13L53,13 c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2h3.385c1.67,0,3.195-1.122,3.537-2.757C60.392,3.998,58.668,2,56.5,2H34.006H32.5h-24 C6.575,2,5,3.575,5,5.5S6.575,9,8.5,9H10c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2l-5.385,0c-1.67,0-3.195,1.122-3.537,2.757 C0.608,18.002,2.332,20,4.5,20H18v12L4.615,32c-1.67,0-3.195,1.122-3.537,2.757C0.608,37.002,2.332,39,4.5,39H5c1.105,0,2,0.895,2,2 c0,1.105-0.895,2-2,2H4.5c-2.168,0-3.892,1.998-3.422,4.243C1.42,48.878,2.945,50,4.615,50H10c1.105,0,2,0.895,2,2 c0,1.105-0.895,2-2,2l-1.385,0c-1.67,0-3.195,1.122-3.537,2.757C4.608,59.002,6.332,61,8.5,61h22.494H32.5h23 c1.925,0,3.5-1.575,3.5-3.5S57.425,54,55.5,54H55c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2h4.385c1.67,0,3.195-1.122,3.537-2.757 C63.392,44.998,61.668,43,59.5,43H47V31h12.385c1.67,0,3.195-1.122,3.537-2.757C63.392,25.998,61.668,24,59.5,24H59 c-1.105,0-2-0.895-2-2C57,20.895,57.895,20,59,20z"
          />
          <linearGradient
            id="IkUh6ey5BhnCh~hrMs1fdb"
            x1="32"
            x2="32"
            y1="56"
            y2="6"
            gradientUnits="userSpaceOnUse"
            spreadMethod="reflect"
          >
            <stop offset="0" stop-color="#ff634d" />
            <stop offset=".204" stop-color="#fe6464" />
            <stop offset=".521" stop-color="#fc6581" />
            <stop offset=".794" stop-color="#fa6694" />
            <stop offset=".989" stop-color="#fa669a" />
            <stop offset="1" stop-color="#fa669a" />
          </linearGradient>
          <path
            fill="url(#IkUh6ey5BhnCh~hrMs1fdb)"
            d="M57,31c0,13.805-11.195,25-25,25S7,44.805,7,31S18.195,6,32,6S57,17.195,57,31z"
          />
          <path
            fill="#fff"
            d="M43.268,19.732L43.268,19.732c0.976,0.976,0.976,2.559,0,3.535L24.267,42.268 c-0.976,0.976-2.559,0.976-3.535,0l0,0c-0.976-0.976-0.976-2.559,0-3.535l19.001-19.001C40.709,18.756,42.292,18.756,43.268,19.732 z"
          />
          <path
            fill="#fff"
            d="M43.268,42.268L43.268,42.268c-0.976,0.976-2.559,0.976-3.535,0L20.732,23.267 c-0.976-0.976-0.976-2.559,0-3.535l0,0c0.976-0.976,2.559-0.976,3.535,0l19.001,19.001C44.244,39.709,44.244,41.292,43.268,42.268z"
          />
        </svg>

        <p>
          Something went wrong
        </p>
      </div>
    </div>
  </body>
</html>
`;

const successTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
    />
    <title>Something went wrong</title>
  </head>
  <body>
    <style type="text/css">
      .tada {
        animation: tada_1870 1.4s linear;
        transform-origin: 50% 50%;
      }

      @keyframes tada_1870 {
        0% {
          transform: scale(1);
        }
        10.52632% {
          transform: scale(0.9) rotate(-8deg);
        }
        21.05263% {
          transform: scale(0.9) rotate(-8deg);
        }
        31.57895% {
          transform: scale(1.3) rotate(8deg);
        }
        42.10526% {
          transform: scale(1.3) rotate(-8deg);
        }
        52.63158% {
          transform: scale(1.3) rotate(8deg);
        }
        63.15789% {
          transform: scale(1.3) rotate(-8deg);
        }
        73.68421% {
          transform: scale(1.3) rotate(8deg);
        }
        84.21053% {
          transform: scale(1) rotate(0);
        }
        100% {
          transform: scale(1) rotate(0);
        }
      }

      body {
        background: #e2f0cb;
        font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      }

      svg {
        max-width: 45vw;
        max-height: 45vw;
      }

      #success {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        height: 100vh;
        align-items: center;
      }

      p {
        padding-top: 30px;
        font-size: 11px;
        text-align: center;
      }

      strong {
        font-weight: 700;
      }
    </style>

    <div id="success">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          width="500px"
          height="500px"
          class="tada"
        >
          <radialGradient
            id="CI_iuYqyQyPDfdBrq7m0La"
            cx="33"
            cy="32"
            r="28.609"
            gradientUnits="userSpaceOnUse"
            spreadMethod="reflect"
          >
            <stop offset="0" stop-color="#afeeff" />
            <stop offset=".193" stop-color="#bbf1ff" />
            <stop offset=".703" stop-color="#d7f8ff" />
            <stop offset="1" stop-color="#e1faff" />
          </radialGradient>
          <path
            fill="url(#CI_iuYqyQyPDfdBrq7m0La)"
            d="M53,34h5.241c2.868,0,5.442-2.082,5.731-4.936C64.303,25.789,61.711,23,58.5,23l-19.33,0 c-1.624,0-3.081-1.216-3.165-2.839C35.914,18.431,37.29,17,39,17l5.241,0c2.868,0,5.442-2.082,5.731-4.936 C50.303,8.789,47.711,6,44.5,6H33h-7.5h-15C7.462,6,5,8.462,5,11.5v0c0,3.038,2.462,5.5,5.5,5.5H14c1.105,0,2,0.895,2,2v0 c0,1.105-0.895,2-2,2l-7.288,0c-2.347,0-4.453,1.704-4.689,4.038C1.752,27.718,3.873,30,6.5,30l6.33,0 c1.624,0,3.081,1.216,3.165,2.839C16.086,34.569,14.71,36,13,36H9.712c-2.347,0-4.453,1.704-4.689,4.038 C4.753,42.718,6.873,45,9.5,45h4.393c0.996,0,1.92,0.681,2.08,1.664C16.176,47.917,15.215,49,14,49H9.712 c-2.347,0-4.453,1.704-4.689,4.038C4.752,55.718,6.873,58,9.5,58h22c0.086,0,0.166-0.021,0.25-0.025C31.834,57.982,31.914,58,32,58 l17.386,0c1.67,0,3.195-1.122,3.537-2.757C53.392,52.998,51.668,51,49.5,51h-5.393c-0.996,0-1.92-0.681-2.08-1.664 C41.824,48.083,42.785,47,44,47l12.288,0c2.347,0,4.453-1.704,4.689-4.039C61.247,40.282,59.127,38,56.5,38h-3.393 c-0.996,0-1.92-0.681-2.08-1.664C50.824,35.083,51.785,34,53,34z"
          />
          <linearGradient
            id="CI_iuYqyQyPDfdBrq7m0Lb"
            x1="32"
            x2="32"
            y1="14"
            y2="49.979"
            gradientUnits="userSpaceOnUse"
            spreadMethod="reflect"
          >
            <stop offset="0" stop-color="#42d778" />
            <stop offset=".428" stop-color="#3dca76" />
            <stop offset="1" stop-color="#34b171" />
          </linearGradient>
          <path
            fill="url(#CI_iuYqyQyPDfdBrq7m0Lb)"
            d="M51.964,15.036L25.482,41.518L12.036,28.036c-1.381-1.381-3.619-1.381-5,0l0,0 c-1.381,1.381-1.381,3.619,0,5l15.82,15.855c1.451,1.451,3.803,1.451,5.254,0l28.855-28.855c1.381-1.381,1.381-3.619,0-5l0,0 C55.584,13.655,53.345,13.655,51.964,15.036z"
          />
        </svg>

        <p>You may now close this window</p>
      </div>
    </div>

    <script>
      setTimeout(function () {
        window.close();
      }, 2000);
    </script>
  </body>
</html>
`;

async function add(req: Request, res: Response) {
  const { name, link, type } = req.query;
  if (!name || !link) {
    res.status(500).json({
      status: "API_ERROR",
      reason: "Missing either name or link ",
    });
    return;
  }

  const db = await connectToDatabase(process.env.MONGODB_URI as string);
  const collection = await db.collection(
    process.env.MONGO_DB_COLLECTION as string
  );

  const status = await collection.insertOne({
    name,
    link: decodeURIComponent(link as string),
    dateAdded: new Date(),
    type,
  });

  if (status) {
    res.status(200).send(successTemplate);
  } else {
    res.status(200).send(errorTemplate);
  }
}

export default add;
