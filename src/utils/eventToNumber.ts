const eventToNumber = (event: Event) => {
  return parseInt((event.target as HTMLInputElement).value)
}

export default eventToNumber
