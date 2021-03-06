const util = require("../util/util")

class riesgoController {
    constructor(dolarSiService) {
        this.dolarSiService = dolarSiService
        this.util = new util()
    }

    /**
     * @description Obtener el valor del riesgo pais
     * @returns Un objeto con el valor del riesgo pais y la fecha y hora de la consulta
     */
    getRiesgoPais = async (req, res) => {
        try {
            const data = await this.dolarSiService.getInfoDolar()
            const valores = {
                fecha: this.util.getDateTime(),
                valor: this.util.formatCurrency(data.cotiza.Riesgo_pais.casa141.compra._text, 3),
            }

            res.send(valores)
        } catch (e) {
            res.sendStatus(500)
            console.log(e)
        }
    }
}

module.exports = riesgoController