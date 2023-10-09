import prisma from '@/app/config/database';

const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export async function getDriver({ params }) {
  const driver = await prisma.TO.findUnique({
    where:{
      name: params.name
    }
  })

  return driver
}

export async function searchReview(query) {
  const { data } = await fetchDrivers({
    filters: { name: { $containsi: query } },
    fields: ["name", "title"],
    sort: ["title"],
    pagination: { pageSize: 5, withCount: false },
  });
  return data.map(({ attributes }) => ({
    name: attributes.name,
    title: attributes.title,
  }))
}

export async function getAllDrivers(pageSize, page) {
  const data = await fetchDrivers()
  return {
    pageCount: 1,
    drivers: data,
  }
}

export async function getNames() {
  const { data } = await fetchDrivers({
    fields: ["name"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return data.map((item) => item.attributes.name);
}

async function fetchDrivers() {
  const url = `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-all-drivers`
  console.log("fetchDrivers:", url);
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching drivers data ${response.status} for ${url}`);
  }
  return response.json();
}
