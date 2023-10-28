import { HttpClient, HttpStatusCode, UnexpectedError, ValidationError, setupPokemonApiConfig } from "../..";

type Input = {
  id: string
};

export const remove = async ({ id }: Input) => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupPokemonApiConfig()
  ).request({
    url: `/pokemon/${id}`,
    method: "DELETE",
  });

  switch (response.statusCode) {
    case HttpStatusCode.NoContent:
      return;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body.erros)
    default:
      throw new UnexpectedError();
  }
};
