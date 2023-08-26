const eventToNumber = (event: Event) => {
  return parseInt((event.target as HTMLInputElement).value, 10)
}

export default eventToNumber
