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
    drivers: data.drivers, 
    driversCount: data.driversCount
  };
}

export async function getAllFilteredDriver(pageSize, page, searchQuery) {
  const url = `${NEXT_PUBLIC_NEXTAUTH_URL}/api/search-driver?query=${encodeURIComponent(searchQuery)}&page=${page}&pageSize=${pageSize}`
  console.log("filteredDrivers:", url)
  const response = await fetch(url)
  if (!response.ok){
    throw new Error(`Error fetching filtered drivers data ${response.status} for ${url}`);
  }

  const data = await response.json()
  return{
    drivers: data.drivers,
    filteredDriverCount: data.filteredDriverCount
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
