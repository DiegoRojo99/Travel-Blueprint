interface params {
  id: string;
  [key: string]: string;
}

interface context {
  params: Promise<params>;
}

export {
  params, 
  context
}