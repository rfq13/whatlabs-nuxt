export default ({ app }, inject) => {
  inject('strCapitalize', (str) => str.charAt(0).toUpperCase() + str.slice(1))
}
