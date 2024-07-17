'use server'

import axios from 'axios'
// const test = 3550308
const getNeighborhook = async (city: string) => {
  try {
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${city}/distritos`,
    )
    const neighborhook = response.data
    console.log('neighborhook', neighborhook)
    return neighborhook
  } catch (erro) {
    console.error(`Erro ao obter bairros da cidade 1200427:`, erro)
  }
}

export default getNeighborhook
