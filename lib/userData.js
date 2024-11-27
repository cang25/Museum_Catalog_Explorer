import { getToken } from "@/lib/authenticate";

export async function addToFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/:id`, {
    method: "PUT",
    headers: {
      authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    //if the operation was not successful return an empty array
    let emptyArr = [];
    return emptyArr;
  }
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/:id`, {
    method: "DELETE",
    headers: {
      authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    //if the operation was not successful return an empty array
    let emptyArr = [];
    return emptyArr;
  }
}

export async function getFavourites() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
    method: "GET",
    headers: {
      authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    //if the operation was not successful return an empty array
    let emptyArr = [];
    return emptyArr;
  }
}

export async function addToHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/:id`, {
    method: "PUT",
    headers: {
      authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    //if the operation was not successful return an empty array
    let emptyArr = [];
    return emptyArr;
  }
}

export async function removeFromHistory(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/:id`, {
    method: "DELETE",
    headers: {
      authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    //if the operation was not successful return an empty array
    let emptyArr = [];
    return emptyArr;
  }
}

export async function getHistory() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    method: "DELETE",
    headers: {
      authorization: `JWT ${getToken()}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    //if the operation was not successful return an empty array
    let emptyArr = [];
    return emptyArr;
  }
}
