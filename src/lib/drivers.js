const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export async function getAllDrivers(pageSize, page) {
  const url = `${NEXT_PUBLIC_NEXTAUTH_URL}/api/drivers?pageSize=${pageSize}&page=${page}`
  console.log("fetchDrivers:", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching drivers data ${response.status} for ${url}`);
  }
  
  const data = await response.json()
  // console.log(`data: ${JSON.stringify(data, null, 2)}`)
  return {
    drivers: data, 
    pageCount: Math.ceil(data.length / pageSize) // This is a simple calculation and might not be accurate if the API has more data
  };
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
