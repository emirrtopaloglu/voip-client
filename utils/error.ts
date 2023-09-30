import { Sequelize, ValidationError } from "sequelize";
import { z } from "zod";

export default function errorGenerator(err) {
  let errorMsg = err.message;
  if (err instanceof ValidationError) {
    errorMsg = err.errors?.map((error) => error.message);
  }
  if (err instanceof z.ZodError) {
    errorMsg = err.errors.map((error) => error.message);
  }

  return errorMsg;
}
