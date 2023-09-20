import { marked } from "marked";
import qs from "qs";

const CMS_URL = process.env.CMS_URL || "https://nextjs-strapi-cms-45gnt.ondigitalocean.app";

export const CACHE_TAG_REVIEWS = 'reviews';

export async function getReview(slug) {
  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "body", "subtitle", "publishedAt"],
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
    body: marked(item.attributes.body, { headerIds: false, mangle: false }),
  };
}

export async function searchReview(query) {
  const { data } = await fetchReviews({
    filters: { slug: { $containsi: query } },
    fields: ["slug", "title"],
    sort: ["title"],
    pagination: { pageSize: 5, withCount: false },
  });
  return data.map(( { attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
  }))
}

export async function getAllReviews(pageSize, page) {
  const { data, meta } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"],
    populate: {
      image: {
        fields: ["url"],
      },
    },
    sort: ["publishedAt:desc"],
    pagination: { pageSize, page },
  });
  return {
    pageCount: meta.pagination.pageCount,
    reviews: data.map(toReview),
  }
}

export async function getSlugs() {
  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 100 },
  });
  return data.map((item) => item.attributes.slug);
}

async function fetchReviews(parameters) {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(parameters, {
      encodeValuesOnly: true,
    });

  //   console.log("fetchReviews:", url);
  const response = await fetch(url, {
    next: {
      // revalidate: 30, //seconds
      tags: [CACHE_TAG_REVIEWS]
    },
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return response.json();
}

function toReview(item) {
  const { attributes } = item;
  // console.log(`item: ${JSON.stringify(item, null, 2)}`)
  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    subtitle: attributes.subtitle,
    image: attributes?.image?.data?.attributes?.url ? (CMS_URL === "http://localhost:1337" ? CMS_URL + attributes.image.data.attributes.url : attributes.image.data.attributes.url) : null ,
  };
}