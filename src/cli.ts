import clc from "cli-color";
import qrcode from "qrcode-terminal";

export function readyCli() {
  console.log(clc.green("The bot is ready!!"));
}

export function qrCodeCli(qr: string) {
  console.log(clc.blue("QR Code Text: ") + qr);
  qrcode.generate(qr, { small: true });
}
