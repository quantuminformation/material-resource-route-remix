import { LoaderFunction } from "@remix-run/node";

const apiKey = process.env.WEATHER_API_KEY;

export let loader: LoaderFunction = async ({ request }) => {
  const city = new URL(request.url).searchParams.get("city");
  if (!city) {
    return new Response("City is required", { status: 400 });
  }

  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  );

  if (!response.ok) {
    return new Response(await response.text(), { status: response.status });
  }

  const data = await response.json();
  return data;
};
