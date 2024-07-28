const util = require("../util/util");
const config = require('../package.json');

class bancosDolarController {
    constructor(dolarSiService, cryptoYaService) {
        this.dolarSiService = dolarSiService;
        this.cryptoYaService = cryptoYaService;
        this.util = new util();
    }

    /**
     * @description Obtiene todas las cotizaciones bancarias
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getAll = async (req, res) => {
        const results = [];
        var functions = Object.values(this)
        .filter(value => typeof value === 'function')
        .filter(value => value.name.startsWith('_'));
        for (let i = 0; i < functions.length; i++) {
            try {
                const result = await functions[i](req, res);
                results.push(result);
            } catch (e) { }
        }
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.send(results);
    }

    /**
     * @description Obtener las cotizaciones del Banco BBVA
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBBVA = async (req, res) => res.send(await this._getDolarBBVA(req, res));
    _getDolarBBVA = async () => {
        const data = await this.cryptoYaService.getDolarBBVA();
        return {
            nombre: 'BBVA',
            descripcion: 'Banco BBVA',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Piano
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarPiano = async (req, res) => res.send(await this._getDolarPiano(req, res));
    _getDolarPiano = async (req, res) => {
        const data = await this.dolarSiService.getInfoDolar(req, res);
        if(!data) {
            return null;
        }
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Piano',
            descripcion: 'Banco Piano',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa37.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa37.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa37.venta._text, 2, taxPercent),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Hipotecario
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarHipotecario = async (req, res) => res.send(await this._getDolarHipotecario(req, res));
    _getDolarHipotecario = async () => {
        const data = await this.cryptoYaService.getDolarHipotecario();
        return {
            nombre: 'Hipotecario',
            descripcion: 'Banco Hipotecario',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Galicia
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarGalicia = async (req, res) => res.send(await this._getDolarGalicia(req, res));
    _getDolarGalicia = async () => {
        const data = await this.cryptoYaService.getDolarGalicia();
        return {
            nombre: 'Galicia',
            descripcion: 'Banco Galicia',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco HSBC
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarHSBC = async (req, res) => res.send(await this._getDolarHSBC(req, res));
    _getDolarHSBC = async () => {
        const data = await this.cryptoYaService.getDolarHSBC();
        return {
            nombre: 'HSBC',
            descripcion: 'Banco HSBC',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco Macro
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarMacro = async (req, res) => res.send(await this._getDolarMacro(req, res));
    _getDolarMacro = async () => {
        const data = await this.cryptoYaService.getDolarMacro();
        return {
            nombre: 'Macro',
            descripcion: 'Banco Macro',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }   
    
    /**
     * @description Obtener las cotizaciones del Banco Brubank
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBrubank = async (req, res) => res.send(await this._getDolarBrubank(req, res));
    _getDolarBrubank = async () => {
        const data = await this.cryptoYaService.getDolarBrubank();
        return {
            nombre: 'Brubank',
            descripcion: 'Brubank',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }     

    /**
     * @description Obtener las cotizaciones del Banco Santander
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarSantander = async (req, res) => res.send(await this._getDolarSantander(req, res));
    _getDolarSantander = async () => {
        const data = await this.cryptoYaService.getDolarBrubank();
        return {
            nombre: 'Santander',
            descripcion: 'Banco Santander',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Ciudad de Buenos Aires
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarCiudad = async (req, res) => res.send(await this._getDolarCiudad(req, res));
    _getDolarCiudad = async () => {
        const data = await this.cryptoYaService.getDolarCiudad();
        return {
            nombre: 'Ciudad',
            descripcion: 'Banco Ciudad',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Supervielle
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarSupervielle = async (req, res) => res.send(await this._getDolarSupervielle(req, res));
    _getDolarSupervielle = async () => {
        const data = await this.cryptoYaService.getDolarSupervielle();
        return {
            nombre: 'Supervielle',
            descripcion: 'Banco Supervielle',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Patagonia
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarPatagonia = async (req, res) => res.send(await this._getDolarPatagonia(req, res));
    _getDolarPatagonia = async () => {
        const data = await this.cryptoYaService.getDolarPatagonia();
        return {
            nombre: 'Patagonia',
            descripcion: 'Banco Patagonia',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Comafi
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarComafi = async (req, res) => res.send(await this._getDolarComafi(req, res));
    _getDolarComafi = async (req, res) => {
        const data = await this.dolarSiService.getInfoDolar(req, res);
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Comafi',
            descripcion: 'Banco Comafi',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa405.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa405.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa405.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco Nación
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarNacion = async (req, res) => res.send(await this._getDolarNacion(req, res));
    _getDolarNacion = async () => {
        const data = await this.cryptoYaService.getDolarNacion();
        return {
            nombre: 'Nación',
            descripcion: 'Banco Nación',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco Industrial
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBIND = async (req, res) => res.send(await this._getDolarBIND(req, res));
    _getDolarBIND = async (req, res) => {
        const data = await this.dolarSiService.getInfoDolar(req, res);
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'BIND',
            descripcion: 'Banco Industrial',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa22.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa22.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa22.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Nuevo Banco del Chaco
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarChaco = async (req, res) => res.send(await this._getDolarChaco(req, res));
    _getDolarChaco = async (req, res) => {
        const data = await this.dolarSiService.getInfoDolar(req, res);
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'NBCH',
            descripcion: 'Nuevo Banco del Chaco',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa334.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa334.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa334.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco de La Pampa
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarPampa = async (req, res) => res.send(await this._getDolarPampa(req, res));
    _getDolarPampa = async (req, res) => {
        const data = await this.dolarSiService.getInfoDolar(req, res);
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Pampa',
            descripcion: 'Banco de La Pampa',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa335.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa335.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa335.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco de Córdoba
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBancor = async (req, res) => res.send(await this._getDolarBancor(req, res));
    _getDolarBancor = async (req, res) => {
        const data = await this.dolarSiService.getInfoDolar(req, res);
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Bancor',
            descripcion: 'Banco de Córdoba',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa341.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa341.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa341.venta._text, 2, taxPercent),
        };
    }

    /**
    * @description Obtener las cotizaciones del Banco de la Provincia de Buenos Aires
    * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
    */
    getDolarProvincia = async (req, res) => res.send(await this._getDolarProvincia(req, res));
    _getDolarProvincia = async () => {
        const data = await this.cryptoYaService.getDolarProvincia();
        return {
            nombre: 'Provincia',
            descripcion: 'Banco Provincia',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }

    /**
     * @description Obtener las cotizaciones del Industrial and Commercial Bank of China (ICBC)
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarICBC = async (req, res) => res.send(await this._getDolarICBC(req, res));
    _getDolarICBC = async () => {
        const data = await this.cryptoYaService.getDolarICBC();
        return {
            nombre: 'ICBC',
            descripcion: 'Banco ICBC',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }

    /**
     * @description Obtener las cotizaciones de Rebanking
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarRebanking = async (req, res) => res.send(await this._getDolarRebanking(req, res));
    _getDolarRebanking = async () => {
        const data = await this.cryptoYaService.getDolarRebanking();
        return {
            nombre: 'Reba',
            descripcion: 'Rebanking',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }

    /**
     * @description Obtener las cotizaciones de Banco Roela
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarRoela = async (req, res) => res.send(await this._getDolarRoela(req, res));
    _getDolarRoela = async (req, res) => {
        const data = await this.dolarSiService.getInfoDolar(req, res);
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Roela',
            descripcion: 'Banco Roela',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa337.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa337.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa337.venta._text, 2, taxPercent),
        };
    }
}

module.exports = bancosDolarController