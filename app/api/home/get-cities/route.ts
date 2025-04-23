import { NextResponse } from "next/server";

const X_RAPID_API_KEY = process.env.X_RAPID_API_KEY;
const COUNTRY_CODE = "PL";
const MIN_POPULATION = 300000;

export async function GET() {
  if (!X_RAPID_API_KEY) {
    console.error('GEO_API_KEY is not defined');
    return NextResponse.json(
      { error: "API key configuration error" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=${COUNTRY_CODE}&minPopulation=${MIN_POPULATION}&limit=10`,
      {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'X-RapidAPI-Key': X_RAPID_API_KEY,
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      }
    );

    const data = await response.json();

    const cities = (data?.data ?? [])
      .sort((a: any, b: any) => b.population - a.population) 
      .map((city: any) => ({
        _id: city.id?.toString() || '',
        name: city.city || ''
      }))

    return NextResponse.json({ cities });
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}