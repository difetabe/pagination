export default function getData() {
  const data = []
  for (let i = 1; data.length < 200; i++) {
    data.push(i++);
  }
  return data;
}
