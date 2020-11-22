class dolarController {
    constructor(dolarSiService, util) {
        this.dolarSiService = dolarSiService
        this.util = util
    }

    /**
     * @description Obtener el valor del dolar oficial
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarOficial = async (req, res) => {
        try {
            const data = await this.dolarSiService.getInfoDolar()
            const valores = {
                fecha: this.util.getDateTime(),
                compra: parseFloat(data.cotiza.Dolar.casa344.compra._text.replace(',', '.')).toFixed(2),
                venta: parseFloat(data.cotiza.Dolar.casa344.venta._text.replace(',', '.')).toFixed(2)
            }
            res.send(valores)
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }


    /**
     * @description Obtener el valor del dolar blue
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBlue = async (req, res) => {
        try {
            const data = await this.dolarSiService.getInfoDolar()
            const valores = {
                fecha: this.util.getDateTime(),
                compra: parseFloat(data.cotiza.Dolar.casa380.compra._text.replace(',', '.')).toFixed(2),
                venta: parseFloat(data.cotiza.Dolar.casa380.venta._text.replace(',', '.')).toFixed(2)
            }

            res.send(valores)
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    }


    /**
     * @description Obtener el valor del dolar contado con liqui
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getContadoConLiqui = async (req, res) => {
        try {
            const data = await this.dolarSiService.getInfoDolar()
            const valores = {
                fecha: this.util.getDateTime(),
                compra: parseFloat(data.cotiza.valores_principales.casa312.compra._text.replace(',', '.')).toFixed(2),
                venta: parseFloat(data.cotiza.valores_principales.casa312.venta._text.replace(',', '.')).toFixed(2)
            }

            res.send(valores)
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    }


    /**
     * @description Obtener el valor del dolar promedio
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarPromedio = async (req, res) => {
        try {
            const data = await this.dolarSiService.getInfoDolar()
            const valores = {
                fecha: this.util.getDateTime(),
                compra: parseFloat(data.cotiza.cotizador.casa302.compra._text.replace(',', '.')).toFixed(2),
                venta: parseFloat(data.cotiza.cotizador.casa302.venta._text.replace(',', '.')).toFixed(2)
            }

            res.send(valores)
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    }


    /**
     * @description Obtener el valor del dolar bolsa
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBolsa = async (req, res) => {
        try {
            const data = await this.dolarSiService.getInfoDolar()
            const valores = {
                fecha: this.util.getDateTime(),
                compra: parseFloat(data.cotiza.valores_principales.casa313.compra._text.replace(',', '.')).toFixed(2),
                venta: parseFloat(data.cotiza.valores_principales.casa313.venta._text.replace(',', '.')).toFixed(2)
            }

            res.send(valores)
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    }
}

module.exports = dolarController