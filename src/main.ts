import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
const validationPipeService = require("@nestts/validation-pipes");

async function bootstrap() {
  try {
    validationPipeService();
    console.log("ValidationPipe is ready");
    const app = await NestFactory.create(AppModule);
    console.log("AppModule is ready");
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (err) {}
}
bootstrap();
