import qs from "qs";

const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export async function getDriver(name) {
  const { data } = await fetchDrivers({
    filters: { name: { $eq: name } },
    fields: ["name", "title", "body", "subtitle", "publishedAt"],
    populate: {
      image: {
        fields: ["url"],
      },
    },
    pagination: { pageSize: 1, withCount: false },
  });

  if (data.length === 0) {
    return null;
  }
  const item = data[0];
  return {
    ...toReview(item),
    // body: marked(item.attributes.body, { headerIds: false, mangle: false }),
  };
}

export async function searchReview(query) {
  const { data } = await fetchDrivers({
    filters: { name: { $containsi: query } },
    fields: ["name", "title"],
    sort: ["title"],
    pagination: { pageSize: 5, withCount: false },
  });
  return data.map(( { attributes }) => ({
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

async function fetchDrivers(parameters) {
  const url =
    `${NEXT_PUBLIC_NEXTAUTH_URL}/api/get-all-drivers?` +
    qs.stringify(parameters, {
      encodeValuesOnly: true,
    });

  //   console.log("fetchDrivers:", url);
  const response = await fetch(url, {
    headers:{
      'Content-Type': 'application/json'
    },
    next: {
      revalidate: 30,
    },
  });
  if (!response.ok) {
    throw new Error(`Error fetching drivers data ${response.status} for ${url}`);
  }
  return response.json();
}

function toReview(item) {
  const { attributes } = item;
  // console.log(`item: ${JSON.stringify(item, null, 2)}`)
  return {
    name: attributes.name,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    subtitle: attributes.subtitle,
    image: attributes?.image?.data?.attributes?.url ? (NEXT_PUBLIC_NEXTAUTH_URL === "http://localhost:1337" ? NEXT_PUBLIC_NEXTAUTH_URL + attributes.image.data.attributes.url : attributes.image.data.attributes.url) : null ,
  };
}