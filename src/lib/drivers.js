const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export async function getAllDrivers(pageSize, page) {
  const data = await fetchDrivers()
  return {
    pageCount: 1,
    drivers: data,
  }
}

export async function getDriver(name) {
  const url = `${NEXT_PUBLIC_NEXTAUTH_URL}/api/drivers/${name}`;
  console.log(`Fetching driver: ${url}`);
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching driver data ${response.status} for ${url}`);
  }

  return response.json();
}

async function fetchDrivers() {
  const url = `${NEXT_PUBLIC_NEXTAUTH_URL}/api/drivers`
  console.log("fetchDrivers:", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching drivers data ${response.status} for ${url}`);
  }
  return response.json();
}
