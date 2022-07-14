const fetchLocation = async (query: string) => {
  const location = await fetch(`/api/location?query=${query}`)
    .then(async res => {
      if (res.status !== 200) {
        const err = await res.json();
        throw new Error(err.error);
      }

      return res;
    })
    .then(res => res.json());

  return location;
};

export default fetchLocation;
