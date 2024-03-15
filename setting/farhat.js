require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
// new module
const axios = require('axios');
const os = require('os');
const { exec } = require("child_process");
const speed = require('performance-now');
const { sizeFormatter } = require('human-readable');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const moment = require('moment-timezone');
const md5 = require('md5');
const crypto = require('crypto')
const { set } = require('lodash');
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const tanggal = moment().tz("Asia/Jakarta").format("ll")
// end

//code by 
let money = JSON.parse(fs.readFileSync('./src/balance.json'))
let limit = JSON.parse(fs.readFileSync('./src/limit.json'))
let signup = JSON.parse(fs.readFileSync('./src/user.json'))
const owner_database = JSON.parse(fs.readFileSync('./src/owner.json'))
const ban = JSON.parse(fs.readFileSync('./src/banned.json'))
const isBanned = JSON.parse(fs.readFileSync('./src/banned.json'))
const PathAuto = "./src/depo/"
const { farhatcekallid } = require("../function/cekallid")
const { scrapHarga } = require("../function/scrapHargaIndo");
// end code


const db_respon_list = JSON.parse(fs.readFileSync('./src/db_list.json'))
const { pricelist, pricelistml } = require('../src/pricelist')
const { addResponList, delResponList, isAlreadyResponList, isAlreadyResponListGroup, sendResponList, updateResponList, getDataResponList } = require('../src/function_list')


const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');
var serialNumber = `ORDER${seconds}${minutes}${hours}${day}${month}${year}`;


// is function
const formatp = sizeFormatter({
  std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

const isUrl = (url) => {
  return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

const jsonformat = (string) => {
  return JSON.stringify(string, null, 2)
}

const getGroupAdmins = (participants) => {
  let admins = []
  for (let i of participants) {
      i.admin === "superadmin" ? admins.push(i.id) :  i.admin === "admin" ? admins.push(i.id) : ''
  }
  return admins || []
}

// Berfungsi Untuk Hit Api & Mengirim Data Headers
const fetchJson = async (url, options) => {
  try {
      options ? options : {}
      const res = await axios({
          method: 'GET',
          url: url,
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
          },
          ...options
      })
      return res.data
  } catch (err) {
      return err
  }
}

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const runtime = function(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function scrapHargaIndo() {
  return ``;
}

function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR"
  return n.toLocaleString("id", { style: "currency", currency: opt.current })
}

function generateRandomString(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function acakindong(min, max = null) {
  if (max !== null) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
  return Math.floor(Math.random() * min) + 1
  }
}

module.exports = reza = async (farhat, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
  
    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await farhat.decodeJid(farhat.user.id);
    const isCreator = [botNumber, ...owner_database].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isBanned = ban.includes(m.sender)    
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const fatkuns = (m.quoted || m)
    const quoted = (fatkuns.mtype == 'buttonsMessage') ? fatkuns[Object.keys(fatkuns)[1]] : (fatkuns.mtype == 'templateMessage') ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]] : (fatkuns.mtype == 'product') ? fatkuns[Object.keys(fatkuns)[0]] : m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const qmsg = (quoted.msg || quoted)
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];
    // Manggil Kunci Api
    const usernamekey = JSON.parse(fs.readFileSync('./src/api_key.json')).digiflazz.usernamekey;
    const productionkey = JSON.parse(fs.readFileSync('./src/api_key.json')).digiflazz.productionkey;
    const atlantickey = JSON.parse(fs.readFileSync('./src/api_key.json')).atlanticpedia.atlantickey;
    const reselerkey = JSON.parse(fs.readFileSync('./src/api_key.json')).vip_reseller.resellerkey;
    const reseleridkey = JSON.parse(fs.readFileSync('./src/api_key.json')).vip_reseller.reselleridkey;
    const merchantapigames = JSON.parse(fs.readFileSync('./src/api_key.json')).apigames.merchantapigames;
    const secretapigames = JSON.parse(fs.readFileSync('./src/api_key.json')).apigames.secretapigames;
    const signatureapigames = JSON.parse(fs.readFileSync('./src/api_key.json')).apigames.signatureapigames;



    const cUrl = (url, method, payload = {}) => {
      let axios = require('axios')
      return axios(url, {
        method: method,
        data: new URLSearchParams(Object.entries(payload))
      })
      .then(({data}) => {
        if (payload.type_mess == 'buy') {
          if (data.result) {
            limitAdd(m.sender, limitrate)
            moneyAdd(m.sender, data.data.price)
            messn = `*── 「 TRX PULSA SUKSES 」 ──*\n\n_📌 Harga : Rp${data.data.price}_\n_📌 Nomor : ${data.data.data.includes('.') ? data.data.data.split('.')[1] : data.data.data}_\n_📌 Nama Item : ${data.data.service}_\n_📌 Trx Id : ${data.data.trxid}_\n\n*_Item Akan Segera Masuk Secara Otomatis Silahkan Melakukan Pengecekan Secara Berkala!._*\n\nNote: *_Jika Ada Kesalahan Nomor Bukan Tanggung Jawab Owner Dan Silahkan Tunggu 5 Menit Untuk Melakukan Transaksi Selanjutnya!.._*`
            let buttons = [
              { buttonId: `${prefix}cek ${data.data.trxid}`, buttonText: { displayText: 'Cek Trx' }, type: 1 },
            ]
            farhat.sendButtonText(from, buttons, `${messn}`,`@RezaDevv`, m)
            fs.unlinkSync(`./src/depo/${sender}1.json`)
          } else {
            if (data.message == 'Saldo Anda tidak cukup untuk melakukan pemesanan ini.') {
              m.reply('*_Maaf Saldo Server Whats Payment Belum Terisi, Silahkan Tunggu Jam Reset Saldo Server Mulai 12.00/18.00_*')
              fs.unlinkSync(`./src/depo/${sender}1.json`)
            } else {
              m.reply(`_pembelian gagal_\n_reason: ${data.message}_`)
              fs.unlinkSync(`./src/depo/${sender}1.json`)
            }
          }
        } else if (payload.type_mess == 'cek') {
          if (data.result) {
            let note = data.data[0].note
            let wosk = `*── 「 STATUS TRX KAMU 」 ──*\n\n_📌 Harga : Rp${data.data[0].price}_\n_📌 Nomor : ${data.data[0].data.includes('.') ? data.data[0].data.split('.')[1] : data.data[0].data}_\n_📌 Nama Item : ${data.data[0].service}_\n_📌 Trx Id : ${data.data[0].trxid}_\n_📌 Serial : ${note.replace("Transaksi Gagal ", "Transaksi Gagal")}_\n\n*_Item Akan Segera Masuk Secara Otomatis Silahkan Melakukan Pengecekan Secara Berkala!._*\n\nNote: *_Jika Ada Kesalahan Nomor Bukan Tanggung Jawab Owner!._*`
            let buttons = [
              { buttonId: `${prefix}cek ${data.data[0].trxid}`, buttonText: { displayText: 'Cek Trx' }, type: 1 },
            ]
            farhat.sendButtonText(from, buttons, `${wosk}`, `@RezaDevv`, m)
          } else {
            m.reply(data.message)
          }
        }
      })
    }
    
    const pulsabuy = (data = {}) => {
      let base_url = 'https://vip-reseller.co.id/api/prepaid'
      let api_key = reselerkey
      let api_id = reseleridkey
      let sign = md5(api_id + api_key)
      
      if (['buy','cek'].includes(data.type) == false) return m.reply('*_harap masukan orang yang benar_*')
    
      let ceng = cUrl(base_url,
        'POST',
        {
          key: api_key,
          sign: sign,
          type: (data.type == 'buy') ? 'order': 'status',
          service: data.id_service,
          data_no: data.target,
          type_mess: data.type,
          trxid: data.trxid
        })
      return ceng
    }
    
    const updatepl = (prov) => {
      let base_url = 'https://vip-reseller.co.id/api/prepaid'
      let api_key = reselerkey // get on config.js
      let api_id = reseleridkey // get on config.js
      let sign = md5(api_id + api_key) // signature cuyyy
      // import md5 nya cuyy
      let payload = {
        key: api_key,
        sign: sign,
        type: 'services',
        filter_type: 'brand',
        filter_value: prov.id
      }
      return new Promise((resolve, reject) => {
        let axios = require('axios')
        axios(`${base_url}`, {method: 'POST', data: new URLSearchParams(Object.entries(payload))}).then((data) => {
      
          let daftar = []
          for (let i of data.data.data) {
            if (i.type == 'pulsa-reguler' && i.status == 'available') {
              daftar.push({id: i.code, price: i.price.basic + 100,name: i.name})
            }
          }
          fs.writeFileSync(prov.file, JSON.stringify(daftar, null, 2))
          resolve({
            status: true,
            list: daftar
          })
        }).catch(reject)
      })
    }

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);

      farhat.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    };

    // Group
    const groupMetadata = m.isGroup ? await farhat.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : ''
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
    const isGroup = m.isGroup
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
    const isUser = signup.includes(sender)

    // Start Money
    const addMonUser = (sender, amount) => {
      let position = false;
      Object.keys(money).forEach((i) => {
        if (money[i].id === sender) {
          position = i;
        }
      });
      if (position === false) {
        console.log(`Sender ID ${sender} not found in balance list`);
        return false;
      } else if (position !== false) {
        money[position].money += amount;
        fs.writeFileSync('./src/balance.json', JSON.stringify(money));
        return true;
      }
    }
    
    
    const moneyAdd = (sender, amount) => {
      let position = false
      Object.keys(money).forEach((i) => {
        if (money[i].id == sender) {
          position = i
        }
      })
      if (position !== false) {
        money[position].money -= amount
        fs.writeFileSync('./src/balance.json', JSON.stringify(money))
      }
    }
    const getMonUser = (sender) => {
        let fiendh = false
      for (let potonlmt of money) {
        if (potonlmt.id === sender) {
           global.userPoton = potonlmt.money
          fiendh = true
          return global.userPoton
        }
      }
      //function adven
      if (fiendh === false) {
        let obj = { id: sender, money: 0 }
        money.push(obj)
        fs.writeFileSync('./src/balance.json', JSON.stringify(money))
      }
    }
    // End Money

    // Start Limt Trx
    const addLimUser = (sender, amount) => {
      let position = false;
      Object.keys(limit).forEach((i) => {
        if (limit[i].id === sender) {
          position = i;
        }
      })
      if (position === false) {
        console.log(`Sender ID ${sender} not found in limit list`);
        return false;
      } else if (position !== false) {
        limit[position].limit += amount
        fs.writeFileSync('./src/limit.json', JSON.stringify(limit))
        return true;
      }
    }
    

    const limitAdd = (sender, amount) => {
      let position = false
      Object.keys(limit).forEach((i) => {
        if (limit[i].id == sender) {
          position = i
        }
      })
      if (position !== false) {
        limit[position].limit -= amount
        fs.writeFileSync('./src/limit.json', JSON.stringify(limit))
      }
    }
    const getLimUser = (sender) => {
        let fiendh = false
        for (let potonlmt of limit) {
          if (potonlmt.id === sender) {
            global.userPoton = potonlmt.limit
            fiendh = true
            return global.userPoton
          }
        }
      //function adven
      if (fiendh === false) {
        let obj = { id: sender, limit: 0 }
        limit.push(obj)
        fs.writeFileSync('./src/limit.json', JSON.stringify(limit))
      }
    }
    // End Limit Trx

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    // Jika ada user
    if (isCmd2 && !isUser) {
      signup.push(sender)
      fs.writeFileSync('./src/user.json', JSON.stringify(signup, null, 2))
    }

    if (isCmd2 && !m.isGroup) {
      console.log(chalk.black(chalk.bgGreen("[ PESAN ]")), color(argsLog, "turquoise"), chalk.magenta("Dari"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "@s.whatsapp.net")} ]`));
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgGreen("[ PESAN ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("Dari"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "@s.whatsapp.net")} ]`),
        chalk.blueBright("Group"),
        chalk.green(groupName)
      );
    }

    if (!isCmd2 && m.isGroup && isAlreadyResponList(from, chath, db_respon_list)) {
      var get_data_respon = getDataResponList(from, chath, db_respon_list)
      if (get_data_respon.isImage === false) {
      farhat.sendMessage(from, { text: sendResponList(from, chath, db_respon_list) }, { quoted: m })
    } else {
      farhat.sendMessage(from, { image: await getBuffer(get_data_respon.image_url), caption: get_data_respon.response }, { quoted: m })
    }
  }

    if (command === 'pulsa') {
      if (!fs.existsSync(PathAuto + `${sender}1` + ".json")) {
        var deposit_object = {
          ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
          session: "bilang_angkanya",
          sender: q,
          data: {text_nya: "",
          code: ""
        }
      }
      fs.writeFileSync(PathAuto + `${sender}1` + ".json", JSON.stringify(deposit_object, null, 2))
    } else {
      m.reply(`*_Silahkan Ketik .cancelpulsa Untuk Melakukan Pembelian Kembali_*`)
    }
  }
  if (fs.existsSync(PathAuto + `${sender}1` + ".json")) {
    let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}1` + ".json"))
    if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
      let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}1` + ".json"))
      if (data_deposit.session === "bilang_angkanya") {;
        if (isNaN(chath)) return m.reply("*_Masukkan Nomor Tujuan_*")
        data_deposit.data.text_nya = `${chath.replace('628','08')}`
        data_deposit.data.code = data_deposit.data.text_nya.substring(0,4)
        data_deposit.session = "text_nya_cuy";
        fs.writeFileSync(PathAuto + `${sender}1` + ".json", JSON.stringify(data_deposit, null, 3));
        nomer = data_deposit.data.text_nya
        code = data_deposit.data.code
        const data = [
          {'name': 'Telkomsel', 'code': ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853'], 'list': './src/list-telkomsel.json'},
          {'name': 'By.U', 'code': ['0851'], 'list': './src/list-bayu.json'},
          {'name': 'Indosat', 'code': ['0814', '0815', '0816', '0855', '0856', '0857', '0858'], 'list': './src/list-indosat.json'},
          {'name': 'XL', 'code': ['0817', '0818', '0819', '0859', '0877', '0878', '0879'], 'list': './src/list-xl.json'},
          {'name': 'Axis', 'code': ['0831', '0832', '0833', '0838'], 'list': './src/list-axis.json'},
          {'name': 'Smartfren', 'code': ['0881', '0882', '0883', '0887', '0888', '0889'], 'list': './src/list-smart.json'},
          {'name': 'Tri', 'code': ['0895', '0896', '0897', '0898', '0899'], 'list': './src/list-tri.json'}
        ]
        let result = {name: 'unknown', file: null}
        for (let i of data) {
          i.code.includes(code) ? result = {name: i.name, file: i.list} : ''
        }
        if (result.name != 'unknown'){
          let list = []
          for (let i of JSON.parse(fs.readFileSync(result.file))) {
            list.push({
              title: i.name,
              rowId: `${prefix}konfirmasipulsa ${nomer}|${i.id}|${i.price}`,
              description: 'Rp'+i.price
            })
          }
          let api_key = reselerkey
          let api_id = reseleridkey
          let sign = md5(api_id + api_key)
          let axios = require('axios')
          axios('https://vip-reseller.co.id/api/profile',{method: 'POST',data: new URLSearchParams(Object.entries({key: api_key,sign: sign}))}).then((res) => {
            const listMessage = {
              text: `*_Pilih layanan sesuai dengan yang anda inginkan, Berikut adalah list yang bisa anda pilih, silahkan!_*\n\n_Server Balance: ${formatmoney(res.data.data.balance)}_\n_Your Balance: ${formatmoney(getMonUser(sender))}_\n\nNote: *_Jika Saldo Server Kurang Dari Harga Pembelian Yang Anda Inginkan Silahkan Tunggu Jam Reset Saldo Server Pada 12.00/18.00 Terimakasih Telah Memilih Kami_*!.`,
              footer: "©Whats Payment",
              buttonText: "Select One Option",
              sections: [{
                title: "Pulsa Reguler",
                rows: list
              }],
              listType: 1
            }
            farhat.sendMessage(m.chat, listMessage)
            })
          } else {
            m.reply('*_Maaf Provider Dari Nomor Anda Tidak Di Temukan_*')
           fs.unlinkSync(`./src/depo/${sender}1.json`)
          }
        }
      }
    }
    if (command === 'kuota') {
      if (!fs.existsSync(PathAuto + `${sender}4` + ".json")) {
        var deposit_object = {
          ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
          session: "bilang_angkanya",
          sender: q,
          data: {
            text_nya: "",
            code: ""
          }
        }
        fs.writeFileSync(PathAuto + `${sender}4` + ".json", JSON.stringify(deposit_object, null, 2))
      } else {
        m.reply(`*_Silahkan Ketik .cancelkuota Untuk Melakukan Pembelian Kembali_*`)
      }
    }
    if (fs.existsSync(PathAuto + `${sender}4` + ".json")) {
      let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}4` + ".json"))
      if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
        let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}4` + ".json"))
        if (data_deposit.session === "bilang_angkanya") {;
          if (isNaN(chath)) return reply("*_Masukkan Nomor Tujuan_*")
          data_deposit.data.text_nya = `${chath.replace('628','08')}`
          data_deposit.data.code = data_deposit.data.text_nya.substring(0,4)
          data_deposit.session = "text_nya_cuy";
          fs.writeFileSync(PathAuto + `${sender}4` + ".json", JSON.stringify(data_deposit, null, 3));
          nomer = data_deposit.data.text_nya
          code = data_deposit.data.code
          let data = [
            {'name': 'TELKOMSEL', 'code': ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853'], 'list': './database/list-telkomsel.json'},
            {'name': 'BY.U', 'code': ['0851'], 'list': './database/list-bayu.json'},
            {'name': 'INDOSAT', 'code': ['0814', '0815', '0816', '0855', '0856', '0857', '0858'], 'list': './database/list-indosat.json'},
            {'name': 'XL', 'code': ['0817', '0818', '0819', '0859', '0877', '0878', '0879'], 'list': './database/list-xl.json'},
            {'name': 'Axis', 'code': ['0831', '0832', '0833', '0838'], 'list': './database/list-axis.json'},
            {'name': 'SMART', 'code': ['0881', '0882', '0883', '0887', '0888', '0889'], 'list': './database/list-smart.json'},
            {'name': 'TRI', 'code': ['0895', '0896', '0897', '0898', '0899'], 'list': './database/list-tri.json'}
          ]
          let result = {name: 'unknown'}
          for (let i of data) {
            i.code.includes(code) ? result = {name: i.name} : ''
          }
          let axios = require('axios')
          let md5 = require('md5')
          let api_key = reselerkey
          let api_id = reseleridkey
          let sign = md5(api_id + api_key)
          axios('https://vip-reseller.co.id/api/prepaid',{
            method: 'POST',
            data: new URLSearchParams(Object.entries({
              key: api_key,
              sign: sign,
              type: 'services',
              filter_type: 'type',
              filter_value: 'paket-internet'
            }))}).then((res) => {
              let resut = res.data.data.sort((i,j) => {
                return i.price.basic - j.price.basic
              })
              let list = []
              if(result.name !== 'unknown'){
                for (let i of resut) {
                  if(i.brand == result.name){
                    list.push({
                      title: i.name,
                      rowId: `${prefix}konfirmasikuota ${nomer}|${i.code}|${i.price.basic}`,
                      description: `${formatmoney(i.price.basic + 100)}`
                    })
                  }
                }
              }else {
                m.reply('*_Maaf Provider Dari Nomor Anda Tidak Terdaftar_*')
                fs.unlinkSync(`./src/depo/${sender}4.json`)
              }
              const listMessage = {
                text: `*_Pilih layanan sesuai dengan yang Anda inginkan! dan Sesuaikan Dengan Kebutuhan Anda Terimakasih!._*\n\nNote: *_Kesalahan Nomor Bukan Tanggung Jawab Owner!._*`,
                footer: "©RezaDevv (Owner)",
                buttonText: "Select One Option",
                sections: [{
                  title: "Whats Payment",
                  rows: list
                }],
                listType: 1
              }
              farhat.sendMessage(m.chat, listMessage)
            })
          }
        }
      }
    if (command === 'emoney') {
      if (!fs.existsSync(PathAuto + `${sender}2` + ".json")) {
        var deposit_object = {
          ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
          session: "bilang_angkanya",
          sender: q,
          data: {
            text_nya: "",
            ref: ""
          }
        }
        fs.writeFileSync(PathAuto + `${sender}2` + ".json", JSON.stringify(deposit_object, null, 2))
      } else {
        m.reply(`*_Silahkan Ketik .cancelemoney Untuk Melakukan Pembelian Kembali_*`)
      }
    }
    if (fs.existsSync(PathAuto + `${sender}2` + ".json")) {
      let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}2` + ".json"))
      if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
        let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}2` + ".json"))
        if (data_deposit.session === "bilang_angkanya") {;
          if (isNaN(chath)) return m.reply("*_Masukkan Nomor Tujuan_*")
          data_deposit.data.text_nya = `${chath.replace('628','08')}`
          data_deposit.data.code = data_deposit.data.text_nya.substring(0,4)
          data_deposit.session = "text_nya_cuy";
          fs.writeFileSync(PathAuto + `${sender}2` + ".json", JSON.stringify(data_deposit, null, 3));
          nomer = data_deposit.data.text_nya
          code = data_deposit.data.code
          let provv = [
            {'id':'shopee pay','nama':'SHOPEE PAY','file':'./src/list-shopee.json'},
            {'id':'ovo','nama':'OVO','file':'./src/list-ovo.json'},
            {'id':'dana','nama':'DANA','file':'./src/list-dana.json'},
            {'id':'bri brizzi','nama':'BRI BRIZZI','file':'./src/list-bri.json'},
            {'id':'go pay','nama':'GOPAY','file':'./src/list-gpay.json'},
            {'id':'doku','nama':'DOKU','file':'./src/list-doku.json'},
            {'id':'linkaja','nama':'LINKAJA','file':'./src/list-linkaja.json'},
            {'id':'grab','nama':'GRAB','file':'./src/list-grab.json'},
            {'id':'mandiri e-toll','nama':'MANDIRI E-TOLL','file':'./src/list-mandiri.json'},
            {'id':'tapcash bni','nama':'TAPCASH BNI','file':'./src/list-bni.json'},
            {'id':'tix id','nama':'TIX ID','file':'./src/list-tix.json'}
          ]
          let list = []
          for (let i of provv) {
            list.push({
              title: i.nama,
              rowId: `${prefix}konfirmasiemoney ${nomer}|${i.id}`,
              description: 'Available'
            })
          }
          const listMessage = {
            text: `*_Pilih Layanan E-Money Yang Anda Inginkan, Berikut Adalah Daftar E-Money Yang Tersedia Dalam Menu Kami!_*`,
            footer: "By @RezaDevv",
            buttonText: "Select One Option",
            sections: [{
              title: "Saldo Emoney",
              rows: list
            }],
            listType: 1
          }
          farhat.sendMessage(m.chat, listMessage)
          }
        }
      }
      if (command === 'tokenpln') {
        if (!fs.existsSync(PathAuto + `${sender}3` + ".json")) {
          var deposit_object = {
            ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
            session: "bilang_angkanya",
            sender: q,
            data: {
              text_nya: "",
              ref: ""
            }
          }
          fs.writeFileSync(PathAuto + `${sender}3` + ".json", JSON.stringify(deposit_object, null, 2))
        } else {
          m.reply(`*_Silahkan Ketik .cancelpln Untuk Melakukan Pembelian Kembali_*`)
        }
      }  
      if (fs.existsSync(PathAuto + `${sender}3` + ".json")) {
        let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}3` + ".json"))
        if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
          let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}3` + ".json"))
          if (data_deposit.session === "bilang_angkanya") {;
            if (isNaN(chath)) return m.reply("*_Masukkan Id Pelanggan_*")
            data_deposit.data.text_nya = `${Number(chath)}`
            data_deposit.session = "text_nya_cuy";
            fs.writeFileSync(PathAuto + `${sender}3` + ".json", JSON.stringify(data_deposit, null, 3));
            let nmrs = data_deposit.data.text_nya
            let axios = require('axios')
            let md5 = require('md5')
            let api_key = reselerkey
            let api_id = reseleridkey
            let sign = md5(api_id + api_key)
            axios('https://vip-reseller.co.id/api/prepaid',{
              method: 'POST',
              data: new URLSearchParams(Object.entries({
                key: api_key,
                sign: sign,
                type: 'services',
                filter_type: 'brand',
                filter_value: 'PLN'
              }))}).then((res) => {
                let result = res.data.data.sort((i,j) => {
                  return i.price.basic - j.price.basic
                })
                let list = []
                for (let i of result) {
                  list.push({
                    title: i.name,
                    rowId: `${prefix}konfirmasipln ${nmrs}|${i.code}|${i.price.basic}`,
                    description: `${formatmoney(i.price.basic + 100)}`
                  })
                }
                let api_key = reselerkey
                let api_id = reseleridkey
                let sign = md5(api_id + api_key)
                axios('https://vip-reseller.co.id/api/profile',{method: 'POST',data: new URLSearchParams(Object.entries({key: api_key,sign: sign}))}).then((res) => {
                  const listMessage = {
                    text: `*_Pilih layanan sesuai dengan yang anda inginkan, Berikut adalah list yang bisa anda pilih, silahkan!_*\n\n_Server Balance: ${formatmoney(res.data.data.balance)}_\n_Your Balance: ${formatmoney(getMonUser(sender))}_\n\nNote: *_Jika Saldo Server Kurang Dari Harga Pembelian Yang Anda Inginkan Silahkan Tunggu Jam Reset Saldo Server Pada 12.00/18.00 Terimakasih Telah Memilih Kami_*`,
                    footer: "©Whats Payment",
                    buttonText: "Select One Option",
                    sections: [{
                      title: "Token Pln Fast",
                      rows: list
                    }],
                    listType: 1
                  }
                  farhat.sendMessage(m.chat, listMessage)
                })
              })
            }
          }
        }
    if (command === 'gamesorder') {
      nomr = text.split("|")[0]
      idnye = text.split("|")[1]
      if (!fs.existsSync(PathAuto + `${sender}6` + ".json")) {
        var deposit_object = {
          ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
          session: "ytmp4",
          sender: nomr,
          data: {
            game_nya: idnye,
            url_nya: "",
            url_nye: ""
          }
        }
        fs.writeFileSync(PathAuto + `${sender}6` + ".json", JSON.stringify(deposit_object, null, 2))
      } else {
        m.reply(`*_Silahkan Ketik .cancelgame Untuk Melakukan Pembelian Kembali_*`)
      }
    }
    if (fs.existsSync(PathAuto + `${sender}6` + ".json")) {
      let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}6` + ".json"))
      if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
        let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}6` + ".json"))
        if (data_deposit.session === "ytmp4") {
          if (isNaN(chath)) return m.reply("*_Masukkan Id Game (Only Id)_*")
          data_deposit.data.url_nya = (chath)
          data_deposit.session = "input_urlytmp4";
          fs.writeFileSync(PathAuto + `${sender}6` + ".json", JSON.stringify(data_deposit, null, 3));
          ininih = data_deposit.data.url_nya
          gamenya = data_deposit.data.game_nya
          messn = `*_Apakah Game Anda Menggunakan Zone?_*`
          let buttons = [
            { buttonId:`inputzone ${ininih}|${gamenya}|${sender}`, buttonText: { displayText: 'Input Zone' }, type: 1 },
            { buttonId:`${prefix}onlyid ${ininih}|${gamenya}`, buttonText: { displayText: 'Hanya Id' }, type: 1 }
          ]
          farhat.sendButtonText(from, buttons, `${messn}`, `${packname}`, m)
        }
      }
    }
    if (command === 'inputzone') {
      nijg = text.split("|")[0]
      ygtdi = text.split("|")[1]
      nw = text.split("|")[2]
      if (!fs.existsSync(PathAuto + `${sender}7` + ".json")) {
        var deposit_object = {
          ID: require("crypto").randomBytes(5).toString("hex").toUpperCase(),
          session: "ytmp4",
          sender: nw,
          data:{
            game_nya: ygtdi,
            url_nya: nijg,
            url_nye: ""
          }
        }
        fs.writeFileSync(PathAuto + `${sender}7` + ".json", JSON.stringify(deposit_object, null, 2))
      } else {
        m.reply(`*_Silahkan Ketik .cancelgame Untuk Melakukan Pembelian Kembali_*`)
      }
    }
    if (fs.existsSync(PathAuto + `${sender}7` + ".json")) {
      let sndr = JSON.parse(fs.readFileSync(PathAuto + `${sender}7` + ".json"))
      if (!chath.startsWith(prefix) && !m.key.fromMe && sender == sndr.sender) {
        let data_deposit = JSON.parse(fs.readFileSync(PathAuto + `${sender}6` + ".json"))
        if (data_deposit.session === "input_urlytmp4") {
          if (isNaN(chath)) return m.reply("*_Masukkan Zone Id_*")
          data_deposit.data.url_nye = (chath)
          data_deposit.session = "ytmp4";
          fs.writeFileSync(PathAuto + `${sender}7` + ".json", JSON.stringify(data_deposit, null, 3));
          ininih = data_deposit.data.url_nya
          inunih = data_deposit.data.url_nye
          ininuh = data_deposit.data.game_nya
          nomr = text.split("|")[0]
          idnye = text.split("|")[1]
          let api_key = atlantickey
          let axios = require('axios')
          axios('https://atlantic-pedia.co.id/api/pulsa',{
            method: 'POST',
            data: new URLSearchParams(Object.entries({
              key: api_key,
              action: 'services',
            }))}).then((res) => {
              let result = res.data.data.sort((i,j) => {
                return i.price.basic - j.price.basic
              })
              let list = []
              for (let i of result) {
                if(i.category == ininuh){
                  list.push({
                    title: i.name,
                    rowId: `${prefix}konfirmasigame ${ininih}${inunih}|${i.code}|${i.price}|${i.name}`,
                    description: 'Rp'+i.price
                  })
                }
              }
              const listMessage = {
                text: `*_Berikut Adalah List Diamond ${ininuh} Yang Tersedia, Silahkan Pilih Salah Satu Yang Anda Ingin Beli._*`,
                footer: "©RezaDevv (Owner)",
                buttonText: "Select Option",
                sections: [{
                  title: "Whats Payment",
                  rows: list
                }],
                listType: 1
              }
              farhat.sendMessage(m.chat, listMessage)
            })
          }
        }
      }
    
    if (isCmd2) {
      switch (command) {
        case "help": case "menu":
          if (isBanned) return m.reply(`*You Have Been Banned*`)
            anu = `*_Whats Payment Versi ${versionscript}_*\n\n╭─❑ 「 INFO USER 」 ❑──\n│ ➤ _Name: ${m.pushName}_\n│ ➤ _Balance: ${formatmoney(getMonUser(sender) ? getMonUser(sender) : "Rp 0,00")}_\n│ ➤ _Limit Trx: ${formatmoney(getLimUser(sender) ? getLimUser(sender) : "Rp 0,00")}_\n│ ➤ _Uid: ${sender.replace("@s.whatsapp.net", "")}_\n│ ➤ _Runtime: ${runtime(process.uptime())}_\n│ ➤ _User Length: ${signup.length}_\n╰❑\n\n╭─❑ 「 LIST MENU CENTER 」 ❑─\n*USER INTERFACE*\n├• 📍 ${prefix}kirimsaldo 1000|6285xxxxxxxxx\n├• 📍 ${prefix}kirimlimit 1000|6285xxxxxxxxx\n├• 📍 ${prefix}caradepo\n├• 📍 ${prefix}owner\n\n*── 「 PRABAYAR 」 ──*\n├• 📍 ${prefix}topup (sultan)\n├• 📍 ${prefix}listgame\n├• 📍 ${prefix}pulsamenu\n├• 📍 ${prefix}plnmenu\n├• 📍 ${prefix}emoneymenu\n\n*── 「 PASCABAYAR 」 ──*\n├• 📍 ${prefix}tagihanpln [no pelanggan]\n├• 📍 ${prefix}tagihanbpjs [coming soon]\n├• 📍 ${prefix}tagihanpdam [coming soon]\n╰❑\n\n*_📅 Tanggal Server : ${tanggalserver}_*\n*_🕒 Waktu Server : ${waktuserver}_*`
            farhat.sendText(m.chat, anu, m)   
        break;
        case "ownermenu" :
        if (!isCreator) throw mess.owner
        srh = `*_Owner Menu Page ${versionscript}_*\n\n╭─❑ 「 OWNER MENU PAGE 」 ❑─\n├• 📍 ${prefix}caradigi (owner only)\n├• 📍 ${prefix}addmoney 1000|62857xxxxxxxx\n├• 📍 ${prefix}addlimit 100|62857xxxxxxxx\n├• 📍 ${prefix}setapikey [option]\n├• 📍 ${prefix}cekapi\n├• 📍 ${prefix}updatelayanan\n├• 📍 ${prefix}cekatc (balance)\n├• 📍 ${prefix}cekvip (balance)\n├• 📍 ${prefix}cekdigi (balance)\n├• 📍 ${prefix}listban\n├• 📍 ${prefix}listuser\n├• 📍 ${prefix}listowner\n├• 📍 ${prefix}ban 6285xxxxxxxxx\n├• 📍 ${prefix}unban 6285xxxxxxxxx\n├• 📍 ${prefix}addowner 6285xxxxxxxxx\n├• 📍 ${prefix}delowner 6285xxxxxxxxx\n╰❑`
        farhat.sendText(m.chat, srh, m)   
        break;
        case "topup": {
          if (isBanned) return m.reply(`*You Have Been Banned*`)
          if (isGroup) throw mess.private
        const sections = [
          {
        title: `Example: ${prefix}topupff id|jumlah`,
        rows: [
            {title: "Price List Diamond Free Fire 🔥", rowId: `${prefix}listdmff`}
        ]
          },
          {
        title: `Example: ${prefix}topupml id|server|jumlah`,
        rows: [
            {title: "Price List Diamond Mobile Legends 🔥", rowId: `${prefix}listdmml`}
        ]
          },
      ]
      let isian = `_*User Profile Account*_\n_📍 Name : ${pushname}_\n_📍 Balance : ${formatmoney(getMonUser(sender) ? getMonUser(sender) : "Rp 0,00")}_\n_📍 Uid : ${sender.replace("@s.whatsapp.net", "")}_\n\nNote: *_Saldo Hanya Digunakan Untuk Top Up Saja, Tidak Bisa Withdraw😉!._*`
      const listMessage = {
        text: isian,
        footer: "By @RezaDevv",
        title: "━━[ List Top Up Whats Payment ]━━",
        buttonText: "Select One Option",
        sections
      }
      farhat.sendMessage(from, listMessage)
      break;
    }
    case "pulsamenu" : {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (isGroup) throw mess.private
	  list = []
      listmenu = [`pulsa ${sender}`,`kuota ${sender}`,`${prefix}cancelpulsa ${sender}`,`${prefix}cancelkuota ${sender}`]
      listmenuu = [`Beli Pulsa 🔥`,`Beli Kuota 🔥`,`Membatalkan 🔥`,`Membatalkan 🔥`]
      listmenuuu = [`Format: Masukan Nomor Tujuan`,`Format: Masukan Nomor Tujuan`,`Pembatalan Pembelian Pulsa`,`Membatalkan Pembelian Kuota`]
        nombor = 1
        startnum = 0
        nor = 1
        mor = 0
      for (let x of listmenu) {
      const yy = {
      title: `${listmenuu[startnum++]}`,
      description: `${listmenuuu[mor++]}`,
      rowId: `${x}`
 }
      list.push(yy)
}

const listMessage = {
  text: `*_Pilih Menu Yang Anda Inginkan & Jangan Lupa Selalu Sesuaikan Dengan Kebutuhan_*`,
  footer: "By @RezaDevv",
  buttonText: "Select One Option",
  sections: [{
    title: "Whats Payment",
    rows: list
  }],
  listType: 1
}

farhat.sendMessage(m.chat, listMessage)
}
break;

    case "listgame" : {
      if (isGroup) throw mess.private
      let provv  = [ {'id':'Arena Of Valor'},
      {'id':'AU2 Mobile'},
      {'id':'Boyaa Capsa Susun'},
      {'id':'Boyaa Domino Qiuqiu'},
      {'id':'Call Of Duty'},
      {'id':'Dragon Raja SEA'},
      {'id':'Free Fire Membership MURAH !'},
      {'id':'Free Fire MURAH !'},
      {'id':'Free Fire PROMO MURAH !'},
      {'id':'Garena Shell BACKUP'},
      {'id':'Garena Shell MURAH'},
      {'id':'Genshin Impact'},
      {'id':'HAGO'},
      {'id':'Higgs Domino'},
      {'id':'IndoPlay Mango'},
      {'id':'Leplace M'},
      {'id':'LifeAfter Credits'},
      {'id':'Lords Mobile'},
      {'id':'Mobile Legends'},
      {'id':'Mobile Legends MURAH!!!'},
      {'id':'Point Blank'},
      {'id':'Point Blank Cash MURAH'},
      {'id':'PUBG Mobile'},
      {'id':'Ride Out Heroes'},
      {'id':'Sausage Man'},
      {'id':'Smile One Coin'},
      {'id':'Speed Drifters'},
      {'id':'Starpass'},
      {'id':'Tom And Jerry Chase Diamond'},
      {'id':'Valorant'}
    ]
    let list = []
    for (let i of provv) {
      list.push({
        title: i.id,
        rowId: `gamesorder ${sender}|${i.id}`,
        description: 'Available'
      })
    }
    const listMessage = {
      text: `*_Pilih Layanan Voucher Game Yang Anda Inginkan, Berikut Adalah Daftar Game Yang Tersedia Dalam Menu Kami!_*`,
      footer: "©RezaDevv (Owner)",
      buttonText: "Select One Click",
      sections: [{
        title: "Whats Payment",
        rows: list
      }],
      listType: 1
    }
    farhat.sendMessage(m.chat, listMessage)
  }
// Start Cancel group
break;

case "listuser" : {
  if (!isCreator) throw mess.owner
  teks = '*_List User :)_*\n\n'
  for (let pengguna of signup) {
    teks += `- ${pengguna}\n`
  }
  teks += `\n*_Total User : ${signup.length}_*`
  farhat.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": signup } })
}
break;
case "listowner" : {
  if (!isCreator) throw mess.owner
  teks = '*_List Owner 📌_*\n\n'
  for (let yoi of owner_database) {
    teks += `🌟 ${yoi}\n`
  }
  teks += `\n*_Total Owner : ${owner_database.length}_*`
  farhat.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": owner_database } })
}
break;
case "cek" : {
  pulsabuy({
    type: 'cek',
    trxid: q
  })
}
break;
case "updatelayanan" : {
  if (!isCreator) throw mess.owner
  let prov = [
    {'id':'telkomsel','file':'./src/list-telkomsel.json'},
    {'id':'by.u','file':'./src/list-bayu.json'},
    {'id':'indosat','file':'./src/list-indosat.json'},
    {'id':'xl','file':'./src/list-xl.json'},
    {'id':'axis','file':'./src/list-axis.json'},
    {'id':'smart','file':'./src/list-smart.json'},
    {'id':'tri','file':'./src/list-tri.json'}
  ]
  for(i of prov) {
    if (!fs.existsSync(i.file)) {
      fs.unlinkSync(i.file)
    }
    updatepl(i)
    m.reply(`*_update layanan sukses ${i.id}_*`)
  }
}
    break;
    case "caradepo"  : {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      let ezaaja = `*─ 「 CARA DEPOSIT MANUAL」 ─*\n*_Berikut Adalah Cara Deposit Manual User!._*\n\n_For Your Information, Whats Payment Hanya Mendukung Deposit Melalui Ovo, Shopeepay, Dana, Qris Saja._\n\n_💸 Ovo : 085742632270_\n_💸 Shopeepay : 085742632270_\n_💸 Dana : 085742632270_\n_💸 Qris : wa.me/+6285742632270_\n\n*_Jika Sudah Melakukan Transfer Harap Kirim Bukti Dengan Cara Mengirim Screenshot Dengan Caption, Contoh :_*\n\n${prefix}bukti JUMLAH|CATATAN\n\n_Contoh :_\n${prefix}bukti 10000|Deposit Kak\n\n*_Untuk Cara Pengisian Limit Dapat Menggunakan Cara Reply/Kirim Bukti Pembayaran Dengan Caption Contoh :_*\n\n${prefix}buylimit JUMLAHLIMIT|CATATAN\n\n_Contoh :_\n${prefix}buylimit 100|Buy Limit Kak\n\n*_Harga 1 Limit Adalah ${profit} Berarti ${hargalimit} Rupiah Per ${limitrate} Limit_*\n\n*_Saldo/Limit Akan Masuk Ketika Owner Mengklik Tombol Setuju Yang Dikirim Bot!._*\n\nNB : *_Perhatian Untuk Minimal Deposit Adalah ${minimaldepo}!. Dan Untuk Limit Adalah ${minimallimit}!. Pastikan Anda Transfer Untuk Pembelian Limit Atau Deposit Di Atas Minimal Transaksi Terimakasih...!_*`
      m.reply(ezaaja)
    }
    break;
    
    case "kirimsaldo" : {
      let saldo = text.split("|")[0] * 1
      let nomor = text.split("|")[1]
      if (!nomor) return m.reply(`*_Harap Isi Nominal Dan Tujuan_*`)
      if (isNaN(parseInt(saldo))) return m.reply('Saldo Harus Berupa Angka!')
      if (saldo < '10') return m.reply('*_Minimal Mengirim Saldo 10!_*')
      if (!addMonUser(nomor + '@s.whatsapp.net', 0)) return m.reply(`*_Gagal mengirim saldo. ID penerima ${nomor.replace('08','628')} tidak ditemukan di dalam daftar saldo_*`);
      if (getMonUser(sender) < saldo) return m.reply('*_Saldo Anda Kurang Untuk Melakukan Transfer_*')
      if (getMonUser(sender) > saldo) {
        moneyAdd(m.sender, saldo)
        addMonUser(nomor.replace('08','628') + `@s.whatsapp.net`, saldo)
        let psn = `*_Kamu Telah Menerima Saldo Dari ${sender.replace("@s.whatsapp.net", "")} Sebesar : ${formatmoney(saldo)}_*`
        let buttons = [
          {buttonId: prefix + `menu`, buttonText: { displayText: 'OK'}, type: 1}
        ]
        farhat.sendButtonText(nomor.replace('08','628') + `@s.whatsapp.net`, buttons, psn, packname, m)
        setTimeout(() => {
          m.reply(`*_Sukses Mengirim Saldo Ke ${nomor.replace('08','628')}_*\n*_Nominal : ${formatmoney(saldo)}_*\n\n*_Saldo Telah Terkirim Ke Nomor Tujuan_*`)
        }, 3000) // delay of 3 second
      }
    }
    break;
    case "kirimlimit" : {
      let limit = text.split("|")[0] * 1
      let nomor = text.split("|")[1]
      if (!nomor) return m.reply(`*_Harap Isi Limit Dan Tujuan_*`)
      if (isNaN(parseInt(limit))) return m.reply('Limit Harus Berupa Angka!')
      if (limit < '5') return m.reply('*_Minimal Kirim Limit 5!_*')
      if (!addLimUser(nomor + '@s.whatsapp.net', 0)) return m.reply(`*_Gagal mengirim limit. ID penerima ${nomor.replace('08','628')} tidak ditemukan di dalam daftar limit_*`);
      if (getLimUser(sender) < limit) return m.reply('*_Limit Anda Kurang Untuk Melakukan Transfer_*')
      if (getLimUser(sender) > limit) {
        limitAdd(m.sender, limit)
        addLimUser(nomor.replace('08','628') + `@s.whatsapp.net`, limit)
        let psn = `*_Kamu Telah Menerima Limit Dari ${sender.replace("@s.whatsapp.net", "")} Sebesar : ${formatmoney(limit)}_*`
        let buttons = [
          {buttonId: prefix + `menu`, buttonText: { displayText: 'OK'}, type: 1}
        ]
        farhat.sendButtonText(nomor.replace('08','628') + `@s.whatsapp.net`, buttons, psn, packname, m)
        setTimeout(() => {
          m.reply(`*_Sukses Mengirim Limit Ke ${nomor.replace('08','628')}_*\n*_Limit : ${formatmoney(limit)}_*\n\n*_Limit Telah Terkirim Ke Nomor Tujuan_*`)
        }, 3000) // delay of 3 seconds
      }
    }

    break;
    case "addmoney" : {
      if (!isCreator) return m.reply (mess.owner)
      let saldo = text.split("|")[0] * 1
      let nomor = text.split("|")[1]
      if (!nomor) return m.reply(`*_Harap Isi Nominal Dan Tujuan_*`)
      if (isNaN(parseInt(saldo))) return m.reply('Deposit Harus Berupa Angka!')
      if (saldo < '10') return m.reply('*_Minimal Saldo 10!_*')
      if (!addMonUser(nomor + '@s.whatsapp.net', 0)) return m.reply(`*_Gagal mengirim saldo. ID penerima ${nomor.replace('08','628')} tidak ditemukan di dalam daftar saldo_*`);
      addMonUser(nomor + `@s.whatsapp.net`, saldo)
      let psn = `*_Anda Telah Mendapatkan Tambahan Saldo Sebesar : ${formatmoney(saldo)}_*`
      let buttons  = [
        {buttonId: prefix + `menu`, buttonText: { displayText: 'OK'}, type: 1}
      ]
      farhat.sendButtonText(nomor + `@s.whatsapp.net`, buttons, psn, packname, m)
      setTimeout(() => {
        m.reply(`*_Sukses Menambah Saldo ${nomor}_*\n*_Nominal : ${formatmoney(saldo)}_*\n\n*_Anda Telah Mengirim Saldo Secara Manual Saldo Telah Di Tambahkan!._*`)
      }, 3000) // delay of 3 second
    }
    break;
    case "addlimit" : {
      if (!isCreator) return m.reply (mess.owner)
      let limit = text.split("|")[0] * 1
      let nomor = text.split("|")[1]
      if (!nomor) return m.reply(`*_Harap Isi Limit Dan Tujuan_*`)
      if (isNaN(parseInt(limit))) return m.reply('Limit Harus Berupa Angka!')
      if (limit < '5') return m.reply('*_Minimal Limit 5!_*')
      if (!addLimUser(nomor + '@s.whatsapp.net', 0)) return m.reply(`*_Gagal mengirim limit. ID penerima ${nomor} tidak ditemukan di dalam daftar limit_*`);
      addLimUser(nomor + `@s.whatsapp.net`, limit)
      let psn = `*_Anda Telah Mendapatkan Tambahan Limit Sebesar : ${formatmoney(limit)}_*`
      let buttons  = [
        {buttonId: prefix + `menu`, buttonText: { displayText: 'OK'}, type: 1}
      ]
      farhat.sendButtonText(nomor + `@s.whatsapp.net`, buttons, psn, packname, m)
      setTimeout(() => {
        m.reply(`*_Sukses Menambah Limit ${nomor}_*\n*_Limit : ${formatmoney(limit)}_*\n\n*_Anda Telah Mengirim Limit Secara Manual Limit Telah Di Tambahkan!._*`)
      }, 3000) // delay of 3 second
    }
    break;
    // Start Bukti Pembayaran
    case "bukti" : {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      let depo = text.split("|")[0]
      let catatnya = text.split("|")[1]
      if (!catatnya) return m.reply(`*_Harap Isi Nominal Dan Catatan_*`)
      let depos = `${formatmoney(depo)}`
      if (depo < minimaldepo) return m.reply(`*_Minimal Deposit Adalah ${minimaldepo}!. Silahkan Ulangi Transaksi_*`)
      if (isNaN(parseInt(depo))) return m.reply('Deposit Harus Berupa Angka!')
      let bukti = `*─ 「 DEPOSIT USER 」 ─*\n*_User Deposite Request_*\n_📍 Balance Before : ${formatmoney(getMonUser(sender) ? getMonUser(sender) : "Rp 0,00")}_\n_📍 Deposit : ${depos}_\n_📍 Uid : ${sender.replace("@s.whatsapp.net", "")}_\n_📍 Catatan : ${catatnya}_\n\n*_Identifikasi Bukti Dengan Cermat Agar Tidak Terjadi Penipuan!._*`
      if (/image/.test(mime)) {
        let media = await quoted.download()
        let count = owner_database.length;
        let sentCount = 0;
        m.reply('```Sedang Mengirim Permintaan```')
        for (let i = 0; i < owner_database.length; i++) {
          setTimeout(function() {
            farhat.sendImage(owner_database[i] + '@s.whatsapp.net', media, `Request From: ${sender.replace("@s.whatsapp.net", "")}`, m)
            let buttons = [
              { buttonId: prefix+`deposetuju ${depo}|${m.sender}`, buttonText: { displayText: 'Setuju' }, type: 1 },
              { buttonId: prefix+`depotidak ${m.sender}`, buttonText: { displayText: 'Tidak Setuju' }, type: 1 }
            ]
            farhat.sendButtonText(owner_database[i] + `@s.whatsapp.net`, buttons, `${bukti}`, `${packname}`, m)
            count--;
            sentCount++;
            if (count === 0) {
              m.reply('```Permintaan Terkirim:```' + sentCount)
            }
          }, i * 2000)
        }
      }
    }
      break;
      case "deposetuju" : {
        if (!isCreator) return m.reply(mess.owner)
        let jumbelah = text.split("|")[0] * 1
        let siapah = text.split("|")[1]
        addMonUser(siapah, jumbelah)
        m.reply('*_Sukses Deposit_*')
        let buttons = [
          { buttonId: prefix+`menu`, buttonText: { displayText: 'Dashboard' }, type: 1 },
          { buttonId: prefix+`topup`, buttonText: { displayText: 'Top Up' }, type: 1 }
        ]
        farhat.sendButtonText(`${siapah}`, buttons, `*_Topup Anda Berhasil Di Setujui, Silahkan Melakukan TopUp Dengan Mudah Hanya Di Whats Payment!_*`, `@RezaDevv`, m)
      }
        break;
        case "depotidak" : {
          if (!isCreator) return m.reply(mess.owner)
          m.reply('*_Deposit Tidak Akan Dilanjutkan_*')
          farhat.sendMessage(`${text}`, {text: `*_Topup Anda Ditolak!, Mungkin Anda Melakukan Fake Topup Atau Kekeliruan Lain, Silahkan Chat Owner Jika Ada Masalah!._*` })
        }
        break;
        // End Bukti Pembayaran
      // Start Buy limit
      case "buylimit" : {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      let limitnya = text.split("|")[0]
      let noted = text.split("|")[1]
      if (!limitnya) return m.reply(`*Harap Isi Nominal Dan Catatan*`)
      let limits = `${formatmoney(limitnya)}`
      if (limitnya < minimallimit) return m.reply(`*_Minimal Pengisian Limit Adalah ${minimallimit}!. Silahkan Ulangi Transaksi_*`)
      if (isNaN(parseInt(limitnya))) return m.reply('Limit Harus Berupa Angka!')
      let buktipembayaran = `*─ 「 BUY LIMIT USER 」 ─*\n*_User Limit Request_*\n_📍 Limit Before : ${formatmoney(getLimUser(sender) ? getLimUser(sender) : "0,00")}_\n_📍 Limit : ${limits}_\n_📍 Uid : ${sender.replace("@s.whatsapp.net", "")}_\n_📍 Catatan : ${noted}_\n\n*_Identifikasi Bukti Dengan Cermat Agar Tidak Terjadi Penipuan!._*`
      if (/image/.test(mime)) {
        let media = await quoted.download()
        let count = owner_database.length;
        let sentCount = 0;
        m.reply('```Sedang Mengirim Permintaan```')
        for (let i = 0; i < owner_database.length; i++) {
          setTimeout(function() {
            farhat.sendImage(owner_database[i] + '@s.whatsapp.net', media, `Request From: ${sender.replace("@s.whatsapp.net", "")}`, m)
            let buttons = [
              { buttonId: prefix+`limitsetuju ${limitnya}|${m.sender}`, buttonText: { displayText: 'Setuju' }, type: 1 },
              { buttonId: prefix+`limittolak ${m.sender}`, buttonText: { displayText: 'Tidak Setuju' }, type: 1 }
            ]
            farhat.sendButtonText(owner_database[i] + `@s.whatsapp.net`, buttons, `${buktipembayaran}`, `${packname}`, m)
            count--;
            sentCount++;
            if (count === 0) {
              m.reply('```Permintaan Terkirim:```' + sentCount)
            }
          }, i * 2000)
        }
      }
    }
    break;
      case "limitsetuju" : {
        if (!isCreator) return m.reply(mess.owner)
        let jmlhlimit = text.split("|")[0] * 1
        let userreq = text.split("|")[1]
        addLimUser(userreq, jmlhlimit)
        m.reply('*_Sukses Buy Limit_*')
        let buttons = [
          { buttonId: prefix+`menu`, buttonText: { displayText: 'Dashboard' }, type: 1 },
          { buttonId: prefix+`topup`, buttonText: { displayText: 'Top Up' }, type: 1 }
        ]
        farhat.sendButtonText(`${userreq}`, buttons, `*_Buy Limit Anda Berhasil Di Setujui, Silahkan Melakukan TopUp Dengan Mudah Hanya Di Whats Payment!_*`, `${packname}`, m)
      }
        break;
        case "limittolak" : {
          if (!isCreator) return m.reply(mess.owner)
          m.reply('*_Buy Limit Tidak Akan Dilanjutkan_*')
          farhat.sendMessage(`${text}`, {text: `*_Buy Limit Anda Ditolak!, Mungkin Anda Melakukan Fake Topup Atau Kekeliruan Lain, Silahkan Chat Owner Jika Ada Masalah!._*` })
      }
      break;

      // Cek koneksi
      case "cekvip" : {
        if (!isCreator) return m.reply(mess.owner)
        let md5 = require('md5')
        let sign = md5(reseleridkey + reselerkey)
        let axios = require('axios')
        axios('https://vip-reseller.co.id/api/profile',{method: 'POST',data: new URLSearchParams(Object.entries({key: reselerkey,sign: sign}))}).then((res) => {
          if (res.data.result == false) {
            m.reply(`*_${res.data.message}_*`)
          }
          if (res.data.message == 'Successfully got your account details.') {
            anjay = `*── 「 Balance Vip Reseller 」 ──*\n\n*_Name : ${res.data.data.full_name}_*\n*_Username : ${res.data.data.username}_*\n*_Balance : ${formatmoney(res.data.data.balance)}_*\n*_Point : ${res.data.data.point}_*\n*_Level : ${res.data.data.level}_*\n*_Register : ${res.data.data.registered}_*`
            farhat.sendText(m.chat, anjay, m) 
          }
      })
    }
    break;
    case "cekatc" : {
      if (!isCreator) return m.reply(mess.owner)
      let axios = require('axios')
          axios('https://atlantic-pedia.co.id/api/profile',{
            method: 'POST',
            data: new URLSearchParams(Object.entries({
              key: atlantickey,
            }))}).then((res) => {
              if (res.data.result == false) {
                m.reply(`*_${res.data.data}_*`)
              }
              if (res.data.result == true) {
                anjoy = `*── 「 Balance Vip Atlantic 」 ──*\n\n*_Name : ${res.data.data.full_name}_*\n*_Username : ${res.data.data.username}_*\n*_Balance : ${formatmoney(res.data.data.balance)}_*\n*_Order : ${res.data.data.order}_*\n*_Spent : ${res.data.data.spent}_*`
                farhat.sendText(m.chat, anjoy, m) 
              }
            })
          }
      break;
      case "cekdigi" : {
        if (!isCreator) return m.reply(mess.owner)
        let md5 = require('md5')
        let fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
        let signa = md5(usernamekey + productionkey + `depo`)
        let data = {
          cmd : `deposit`,
          username : usernamekey,
          sign : signa,
        }
        fetch(`https://api.digiflazz.com/v1/cek-saldo`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then((data) => {
          anjir = `*── 「 Balance DigiFlazz 」 ──*\n\n*_Balance : ${formatmoney(data.data.deposit)}_*`
          farhat.sendText(m.chat, anjir, m) 
        })
      }
      break;

      case 'cekid': {
        let gameid = text.split(" ")[0];
        let id = text.split(" ")[1];
        let zone = text.split(" ")[2];
        const usernamenya = await farhatcekallid(gameid, id, zone);
        const uservip = usernamenya.msg;
        if (usernamenya.status === 404) {
          m.reply('*「 TOPUP GAGAL 」*\n\n*ID Tidak Ditemukan*');
          return;
        }
        m.reply(`${uservip}`);
    }
    break;

    case 'getharga':
      scrapHarga();
    break;
    
      case 'fag': {
        if (!isCreator) throw mess.owner
        let skudg1 = text.split(" ")[0].toUpperCase();
        let tujuanordigi = text.split(" ")[1];
        let tujuanordigi2 = text.split(" ")[2] || '';
      
        if (!tujuanordigi || !skudg1) return reply(`*Example* :\n${prefix + command} SKU<space>User_id<space>Zone_id\n\n*Contoh* :\n${prefix + command} ML3 583716368 8327\n`);
    
        let refdg1 = acakindong(1, 10000000000000);
        let referdfdg1 = `UPIN-${refdg1}`;
        let isiandg1 = `${tujuanordigi}${tujuanordigi2}`;
        let dmdg1 = `${skudg1}`;
    
        let codetujuandigi = '';
        if (skudg1.includes("ML")) {
          codetujuandigi = "mobile-legends";
        } else if (skudg1.includes("FF")) {
          codetujuandigi = "free-fire";
        } else if (skudg1.includes("VALO")) {
          codetujuandigi = "valorant";
        } else if (skudg1.includes("ZEP")) {
          codetujuandigi = "zepeto";
        } else if (skudg1.includes("AOV")) {
          codetujuandigi = "arena-of-valor";
        } else if (skudg1.includes("COD")) {
          codetujuandigi = "call-of-duty-mobile";
        } else if (skudg1.includes("DR")) {
          codetujuandigi = "dragon-raja";
        } else if (skudg1.includes("PB")) {
          codetujuandigi = "point-blank";
        } else if (skudg1.includes("LOL")) {
          codetujuandigi = "league-of-legends-wild-rift";
        } else if (skudg1.includes("RAG")) {
          codetujuandigi = "ragnarok-m-eternal-love-big-cat-coin";
        } else if (skudg1.includes("SD")) {
          codetujuandigi = "speed-drifters";
        } else if (skudg1.includes("HAGO")) {
          codetujuandigi = "hago";
        } else if (skudg1.includes("MSW")) {
          codetujuandigi = "marvel-super-war";
        } else if (skudg1.includes("LAP")) {
          codetujuandigi = "laplace-m";
        } else if (skudg1.includes("CHESS")) {
          codetujuandigi = "auto-chess";
        } else if (skudg1.includes("TJ")) {
          codetujuandigi = "tom-and-jerry-chase";
        } else if (skudg1.includes("BAL")) {
          codetujuandigi = "bullet-angel";
        } else if (skudg1.includes("LM")) {
          codetujuandigi = "lords-mobile";
        }
    
        const signature1 = crypto.createHash('md5')
            .update(usernamekey + productionkey + referdfdg1)
            .digest('hex');
      
            const usernameObj = await farhatcekallid(codetujuandigi, tujuanordigi, tujuanordigi2 !== '' ? tujuanordigi2 : '-');
            const username3 = usernameObj.nickname;
            if (usernameObj.status === 404) {
              m.reply('*「 TOPUP GAGAL 」*\n\n*ID Tidak Ditemukan*');
              return;
            }
        const config = {
        method: 'POST',
        url: 'https://api.digiflazz.com/v1/transaction',
        data: {
            "username": usernamekey,
            "buyer_sku_code": dmdg1,
            "customer_no": isiandg1,
            "ref_id": referdfdg1,
            "sign": signature1
        }
        };
        axios(config)
        .then(async res => {
            m.reply(`*── 「 TOPUP PENDING 」 ──*\n\n_Note :_\nMohon Tunggu Pesanan Anda Sedang Diproses`);
            let status = res.data.data.status;
            console.log(status);
            while (status !== 'Sukses') {
            await sleep(1000);
            const response = await axios(config);
            status = response.data.data.status;
            console.log(status);
    
            if (status === "Gagal") {
                m.reply(`*── 「 TRANSKSI GAGAL 」 ──*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`);
                farhat.sendMessage(nomorKu, { text: `ERROR CODE : ${response.data.data.rc}\n\nDetail Error code : https://developer.digiflazz.com/api/buyer/response-code/` }, { Quoted: m });
                break;
            } else if (status === "Sukses") {
                m.reply(`*── 「 TRANSKSI SUKSES 」 ──*\n\n⭔ *ID Game* : ${tujuanordigi} (${tujuanordigi2 || ''})\n⭔ *Username* : _(${username3})_\n⭔ *Ref Id* : ${response.data.data.ref_id}\n⭔ *SN* : ${serialNumber}\n⭔ *Waktu* : '${jam}, ${tanggal}'\n\n*_TERIMAH KASIH TELAH BERTRANSAKSI DI ${packname}_*`);
                break;
            }
        }
        })
        .catch(error => {
          m.reply(`*── 「 TRANSKSI GAGAL 」 ──*\n\n*Transaksi Gagal Harap Periksa Chat Personal Bot Anda*`);
          if (error.response && error.response.data && error.response.data.data && error.response.data.data.rc) {
              farhat.sendMessage(nomorKu, { text: `ERROR CODE : ${error.response.data.data.rc}\n\nDetail Error code : UYY PIN ERROR NI` }, { Quoted: m });
          } else {
              console.error('Kesalahan tidak terduga:', error);
          }
      });
      
      }
      break;

      case "topupdigi" : case "digi" : case "alltopup" : {
        if (!isCreator) throw mess.owner
        let skc = text.split("|")[0]
        let ctn = text.split("|")[1]
        if (!skc) return m.reply(`*_Harap Isi Sku Code_*`)
        if (!ctn) return m.reply(`*_Harap Isi Sku Cust No_*`)
        let refid = generateRandomString(10)
        let data = {
          username : usernamekey,
          buyer_sku_code : skc,
          customer_no : ctn,
          ref_id : refid,
          sign : md5(usernamekey + productionkey + refid),
        }
        fetch('https://api.digiflazz.com/v1/transaction', {
          method : 'POST',
          body : JSON.stringify(data),
          header : {
            'Content-Type': 'application/json'
          }
        }).then ((response) => response.json())
        .then ((res) => {
          pesan = `*── 「 TRANSAKSI BERHASIL 」 ──*\n\n_📌 Nomor Tujuan : ${res.data.customer_no}_\n_📌 Status : ${res.data.status}_\n_📌 Message : ${res.data.message}_\n_📌 Ref Id : ${res.data.ref_id}_\n_📌 Waktu : ${waktuserver}_\n_📌 Tanggal : ${tanggalserver}_\n\n_*Terimakasih ${pushname}🥰*_`
          let buttons = [
          { buttonId: prefix+`cektransaksi ${refid}|${skc}|${ctn}`, buttonText: { displayText: 'Cek Transaksi' }, type: 1 },
        ]
        farhat.sendButtonText(from, buttons, `${pesan}`, `${packname}`, m)
        })
      }
      break;

      case "cektransaksi": {
        if (!isCreator) throw mess.owner
        let refid = text.split("|")[0]
        let skc = text.split("|")[1]
        let ctn = text.split("|")[2]
        let data = {
          username : usernamekey,
          buyer_sku_code : skc,
          customer_no : ctn,
          ref_id : refid,
          sign : md5(usernamekey + productionkey + refid),
        }
        fetch('https://api.digiflazz.com/v1/transaction', {
          method : 'POST',
          body : JSON.stringify(data),
          header : {
            'Content-Type': 'application/json'
          }
        }).then ((response) => response.json())
        .then ((res) => {
          pesan = `*── 「 STATUS TRANSAKSI 」 ──*\n\n_📌 Nomor Tujuan : ${res.data.customer_no}_\n_📌 Status : ${res.data.status}_\n_📌 Message : ${res.data.message}_\n_📌 Ref Id : ${res.data.ref_id}_\n_📌 Serial Num : ${res.data.sn.replace("","Null")}_\n_📌 Waktu : ${waktuserver}_\n_📌 Tanggal : ${tanggalserver}_\n\n_*Terimakasih Telah Bertransaksi ${pushname}🥰*_`
          let buttons = [
            { buttonId: prefix + `cektransaksi ${refid}|${skc}|${ctn}`, buttonText: { displayText: 'Cek Transaksi' }, type: 1 },
          ]
          farhat.sendButtonText(from, buttons, `${pesan}`, `${packname}`, m)     
        })
      }
      break;

        case 'owner': case 'creator': {
          if (isBanned) return m.reply(`*You Have Been Banned*`)
          farhat.sendContact(m.chat, owner_database, m)
        }
      break;

      // setting list
      case "store":
        case "list": {
            if (!isGroup) return m.reply(mess.group);
            if (db_respon_list.length === 0) return m.reply('```Belum Ada List```');
            if (!isAlreadyResponListGroup(from, db_respon_list)) return m.reply('```Belum Ada List Terdaftar Di Group Ini```');
        
            var arr_rows = [];
            for (let x of db_respon_list) {
                if (x.id == from) {
                    arr_rows.push({
                        title: x.key,
                        rowId: x.key
                    });
                }
            }
        
            var listMsg = {
                text: `Hi Kak ${pushname ? pushname : "Anon"}`,
                footer: `_List From ${groupName}_`,
                mentions: [sender],
                sections: [{
                    title: groupName,
                    rows: arr_rows
                }]
            };
        
            farhat.sendMessage(from, listMsg)
                .catch(error => {
                    console.error('Error sending message:', error);
                    m.reply('```Gagal mengirim pesan, silakan coba lagi nanti```');
                });
        }
        break;
        

  case "addlist" : {
    if (!isGroup) return m.reply(mess.group)
    if (!isBotAdmins) return m.reply(mess.botAdmin)
    if (!isAdmins) return m.reply(mess.admin)
    if (!isCreator) return m.reply(mess.owner)
    let text1 = text.split("|")[0]
    let text2 = text.split("|")[1]
    if (!text.includes("|")) return m.reply(`Gunakan dengan cara ${prefix + command} *_key|response_*`)
    if (isAlreadyResponList(from, text1, db_respon_list)) return m.reply(`List Response Dengan Key *${text1}* Telah Tersedia Di Group Ini`)
    addResponList(from, text1, text2, false, '-', db_respon_list)
    m.reply(`*_Berhasil Menambah List ${text1}_*`)
  }
  break;
  case "dellist" : {
    if (!isGroup) return m.reply(mess.group)
    if (!isBotAdmins) return m.reply(mess.botAdmin)
    if (!isAdmins) return m.reply(mess.admin)
    if (!isCreator) return m.reply(mess.owner)
    if (db_respon_list.length === 0) return m.reply('```Belum Ada List Di Database```')
    if (!text) return m.reply(`Example: ${prefix + command} *_key_*`)
    if (!isAlreadyResponList(from, text, db_respon_list)) return m.reply(`List Response Dengan Key *_${text}_* Tidak Di Temukan`)
    delResponList(from, text, db_respon_list)
    m.reply(`*_Sukses Delete List Dengan Key ${text}_*`)
  }
  break;
  case "update" : {
    if (!isGroup) return m.reply(mess.group)
    if (!isBotAdmins) return m.reply(mess.botAdmin)
    if (!isAdmins) return m.reply(mess.admin)
    if (!isCreator) return m.reply(mess.owner)
    var text1 = text.split("|")[0]
    var text2 = text.split("|")[1]
    if (!text.includes("|")) return m.reply(`Gunakan dengan cara ${prefix + command} *_key|response_*`)
    if (!isAlreadyResponListGroup(from, db_respon_list)) return m.reply(`Maaf, Untuk Key *${text1}* Belum Terdaftar`)
    updateResponList(from, text1, text2, false, '-', db_respon_list)
    m.reply(`*_Berhasil Update List ${text1}_*`)
  }
      break;
      case 'restart' : {
      if (!isCreator) return m.reply(mess.owner)
      await m.reply(`_Restarting ${packname}_`)
      try{
        await farhat.sendMessage(from, {text: "*_Succes_*"})
        await sleep(3000)
        exec(`npm start`)
      } catch (err) {
        exec(`node index.js`)
        await sleep(4000)
        m.reply('*_Sukses_*')
      }
    }
      break;
      case 'whoisip': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        if (!text) throw `Example : ${prefix + command} 192.168.152.24`
        m.reply(mess.wait)
        let anu = await fetchJson(api('lol', '/api/ipaddress/'+text, {}, 'apikey'))
        farhat.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/94b5d3acb51c1eea47b22.png' }, caption: `⭔ Country : ${anu.result.country}\n⭔ Country Code : ${anu.result.countryCode}\n⭔ Region : ${anu.result.region}\n⭔ Region Name : ${anu.result.regionName}\n⭔ City : ${anu.result.city}\n⭔ Zip : ${anu.result.zip}\n⭔ Lat : ${anu.result.lat}\n⭔ Lon : ${anu.result.lon}\n⭔ Time Zone : ${anu.result.timezone}\n⭔ Isp : ${anu.result.isp}\n⭔ Org : ${anu.result.org}\n⭔ As : ${anu.result.as}\n⭔ Query : ${anu.result.query}`}, { quoted: m })
    }
      break;
      case 'listonline': case 'liston': {
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        farhat.sendText(m.chat, 'List Online:\n\n' + online.map(v => '⭔ @' + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
 }
      break;
      case 'tourl': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        m.reply(mess.wait)
        let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./uploader')
        let media = await farhat.downloadAndSaveMediaMessage(qmsg)
        if (/image/.test(mime)) {
            let anu = await TelegraPh(media)
            m.reply(util.format(anu))
        } else if (!/image/.test(mime)) {
            let anu = await UploadFileUgu(media)
            m.reply(util.format(anu))
        }
        await fs.
        unlinkSync(media)
    }
    break;
    case 'toaudio': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!text) throw `Example : ${prefix + command} Hallo semua`
      m.reply(mess.wait)
        farhat.sendMessage(m.chat, {audio: { url: `https://api.lolhuman.xyz/api/gtts/id?apikey=${lolkey}&text=${text}` }, mimetype: 'audio/mpeg'}, { quoted : m })

    }

    break;
    case 'alquran': {
      if (!args[0]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
      if (!args[1]) throw `Contoh penggunaan:\n${prefix + command} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`
      let res = await fetchJson(`https://api.zahwazein.xyz/islami/quran/${args[0]}/${args[1]}?apikey=${zenzkey}`)
      if (res.status == false) return m.reply(res.result.message)
      let txt = `*Arab* : ${res.result.text.arab}\n\n*English* : ${res.result.translation.en}\n\n*Indonesia* : ${res.result.translation.id}\n\n( Q.S ${res.result.surah.name.transliteration.id} : ${res.result.number.inSurah} )`
      m.reply(txt)
      farhat.sendMessage(m.chat, {audio: { url: res.result.audio.primary }, mimetype: 'audio/mpeg'}, { quoted : m })
      }
      break;
      case 'ayatkursi': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        m.reply(mess.wait)
        let eza = await fetchJson(`https://saipulanuar.ga/api/muslim/ayatkursi`)
        farhat.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/94b5d3acb51c1eea47b22.png' }, caption: `⭔ Nama : *Ayat Kursi*\n\n⭔ Arab : ${eza.result.arabic}\n\n⭔ Latin : ${eza.result.latin}\n\n⭔ Artinya : ${eza.result.translation}`}, { quoted: m })
		}
    break;
    case 'anime': case 'waifu': case 'husbu': case 'neko': case 'shinobu': case 'megumin': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      m.reply(mess.wait)
      farhat.sendMessage(m.chat, { image: { url: api('zenz', '/randomanime/'+command, {}, 'apikey') }, caption: 'Generate Random ' + command }, { quoted: m })
  }
    break;
    case 'join': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!isCreator) throw mess.owner
      if (!text) throw 'Masukkan Link Group!'
      if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalid!'
      m.reply(mess.wait)
      let result = args[0].split('https://chat.whatsapp.com/')[1]
      await farhat.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
  }
  break;
  case 'block': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!isCreator) throw mess.owner
    let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
    await farhat.updateBlockStatus(users, 'block').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
  break;
  case 'unblock': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
		if (!isCreator) throw mess.owner
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await farhat.updateBlockStatus(users, 'unblock').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	}
    break;
    case 'kick': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) throw mess.group
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
      let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
      await farhat.groupParticipantsUpdate(m.chat, users, 'remove').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
    break;
    case 'add': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) throw mess.group
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
      let users = m.mentionedJid[0] ? m.mentionedJid : m.quoted ? [m.quoted.sender] : [text.replace(/[^0-9]/g, '')+'@s.whatsapp.net']
      await farhat.groupParticipantsUpdate(m.chat, users, 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
}
    break;
    case 'tagall': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      if (!m.isGroup) throw mess.group
      if (!isBotAdmins) throw mess.botAdmin
      if (!isAdmins) throw mess.admin
let teks = `══✪〘 *👥 Tag All* 〙✪══

➲ *Pesan : ${q ? q : 'kosong'}*\n\n`
      for (let mem of participants) {
      teks += `⭔ @${mem.id.split('@')[0]}\n`
      }
      farhat.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, { quoted: m })
      }
      break;
      
        case 'sticker': case 's': case 'stickergif': 
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        {
          if (/image/.test(mime)) {
          m.reply(mess.wait)
               let media = await farhat.downloadMediaMessage(qmsg)
               let encmedia = await farhat.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
               await fs.unlinkSync(encmedia)
           } else if (/video/.test(mime)) {
           m.reply(mess.wait)
               if (qmsg.seconds > 11) return m.reply('Maksimal 10 detik!')
               let media = await farhat.downloadMediaMessage(qmsg)
               let encmedia = await farhat.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
               await fs.unlinkSync(encmedia)
           } else {
               m.reply(`Kirim/reply gambar/video/gif dengan caption ${prefix + command}\nDurasi Video/Gif 1-9 Detik`)
               }
           }
           break;
           case 'getip': {
            if (!isCreator) throw mess.owner
                m.reply("My public IP address is: " + ipserver);
              }
          break;
          case 'ping': case 'botstatus': case 'statusbot': {
            if (!isCreator) throw mess.owner
            const used = process.memoryUsage()
            const cpus = os.cpus().map(cpu => {
                cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
          return cpu
            })
            const cpu = cpus.reduce((last, cpu, _, { length }) => {
                last.total += cpu.total
                last.speed += cpu.speed / length
                last.times.user += cpu.times.user
                last.times.nice += cpu.times.nice
                last.times.sys += cpu.times.sys
                last.times.idle += cpu.times.idle
                last.times.irq += cpu.times.irq
                return last
            }, {
                speed: 0,
                total: 0,
                times: {
              user: 0,
              nice: 0,
              sys: 0,
              idle: 0,
              irq: 0
            }
            })
            let timestamp = speed()
            let latensi = speed() - timestamp
            neww = performance.now()
            oldd = performance.now()
            respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${oldd - neww} _miliseconds_\n\nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
_NodeJS Memory Usaage_
${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}
${cpus[0] ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\n')}`).join('\n\n')}` : ''}
            `.trim()
            m.reply(respon)
        }
        break;
        case 'gempa': {
          if (isBanned) return m.reply(`*You Have Been Banned*`)
          m.reply(mess.waitdata)
          let anu = await fetchJson(api('zenz', '/information/bmkg/gempa', {}, 'apikey'))
          if (anu.status == false) return m.reply(anu.result.message)
          farhat.sendMessage(m.chat, { image: { url: anu.result.shakemap }, caption: `⭔ Tanggal : ${anu.result.tanggal}\n⭔ Jam : ${anu.result.jam}\n⭔ Date Time : ${anu.result.datetime}\n⭔ Coordinate : ${anu.result.coordinates}\n⭔ Lintang : ${anu.result.lintang}\n⭔ Bujur : ${anu.result.bujur}\n⭔ Magnitude : ${anu.result.magnitude}\n⭔ Kedalaman : ${anu.result.kedalaman}\n⭔ Wilayah : ${anu.result.wilayah}\n⭔ Potensi : ${anu.result.potensi}\n⭔ Dirasakan : ${anu.result.dirasakan}`}, { quoted: m })
      }
      break;
      case 'jadwalsholat': {
        m.reply(mess.wait+`${text}`)
        if (!text) throw `Example : ${prefix + command} banjar`
        let fetch = await fetchJson(api('zenz', '/islami/jadwalshalat', { kota: text }, 'apikey'))
        if (fetch.status == false) return m.reply(fetch.result.message)
        let i = fetch.result
        let teks = `Jadwal Sholat Kota : ${text}\n\n`
        teks += `⭔ Tanggal : ${i.tanggal}\n`
        teks += `⭔ Subuh : ${i.subuh}\n`
        teks += `⭔ Duha : ${i.duha}\n`
        teks += `⭔ Dzuhur : ${i.zuhur}\n`
        teks += `⭔ Ashar : ${i.asar}\n`
        teks += `⭔ Maghrib : ${i.magrib}\n`
        teks += `⭔ Isya : ${i.isya}\n`
        farhat.sendText(m.chat, teks, m)
      }
      break;
      case 'asmaulhusna': {
          m.reply(mess.wait)
          let fetch = await fetchJson(`https://raw.githubusercontent.com/BochilTeam/database/master/religi/asmaulhusna.json`)
          let caption = `*Asmaul Husna*\n\n`
          for (let i of fetch) {
            caption += `⭔ No : ${i.index}\n`
            caption += `⭔ Arab : ${i.arabic}\n`
            caption += `⭔ Latin : ${i.latin}\n`
            caption += `⭔ Indonesia : ${i.translation_id}\n`
            caption += `⭔ English : ${i.translation_en}\n\n`
        }
        farhat.sendText(m.chat, caption, m)
      }
      break;
      case 'kompasnews': {
      if (isBanned) return m.reply(`*You Have Been Banned*`)
      m.reply(mess.wait)
      let fetch = await fetchJson(`https://api.zahwazein.xyz/news/kompas?apikey=${zenzkey}`)
      let caption = `Latest News From Kompasnews\n\n`
        for (let i of fetch.result) {
            caption += `⭔ Judul Berita : ${i.berita}\n`
            caption += `⭔ Di Upload : ${i.berita_diupload}\n`
            caption += `⭔ Jenis : ${i.berita_jenis}\n`
            caption += `⭔ Url : ${i.berita_url}\n\n`
        }
        farhat.sendImage(m.chat, fetch.result[0].berita_thumb, caption, m)
      }
      break;
      case 'shortlink': {
        if (isBanned) return m.reply(`*You Have Been Banned*`)
        if (!text) throw `Example : ${prefix + command} https://google.com`
        m.reply(mess.wait)
        let anu = await fetchJson(`https://api.lolhuman.xyz/api/shortlink?apikey=${lolkey}&url=${text}`)
        farhat.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/94b5d3acb51c1eea47b22.png' }, caption: `*Success ✔*\n⭔ Url : ${anu.result}`}, { quoted: m })
    }
  break;
  case 'ytshorts': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!text) throw 'Masukkan Query Link!'
    m.reply(mess.wait)
    let anu = await fetchJson(`https://api.zahwazein.xyz/downloader/ytshorts?apikey=${zenzkey}&url=${text}`)
    if (anu.status == false) return m.reply(anu.result.message)
    let buttons = [
        {buttonId: `${prefix}menu`, buttonText: {displayText: '► Menu'}, type: 1}
    ]
    let buttonMessage = {
        video: { url: anu.result.getVideo },
        caption: `Download From ${text}`,
        footer: 'Press Button For Menu',
        buttons: buttons,
        headerType: 5
    }
    farhat.sendMessage(m.chat, buttonMessage, { quoted: m })
}
  break;
  case 'ytmp4': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!text) throw 'Masukkan Query Link!'
    m.reply(mess.wait)
    let anu = await fetchJson(`https://api.zahwazein.xyz/downloader/youtube?apikey=${zenzkey}&url=${text}`)
    if (anu.status == false) return m.reply(anu.result.message)
    let buttons = [
        {buttonId: `${prefix}menu`, buttonText: {displayText: '► Menu'}, type: 1}
    ]
    let buttonMessage = {
        video: { url: anu.result.getVideo },
        caption: `Download From ${text}`,
        footer: 'Press Button For Menu',
        buttons: buttons,
        headerType: 5
    }
    farhat.sendMessage(m.chat, buttonMessage, { quoted: m })
}
  break;
  case 'tiktok': case 'tiktoknowm': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!text) throw 'Masukkan Query Link!'
    m.reply(mess.wait)
    let anu = await fetchJson(api('zenz', '/downloader/tiktok', { url: text }, 'apikey'))
    if (anu.status == false) return m.reply(anu.result.message)
    let buttons = [
        {buttonId: `${prefix}menu`, buttonText: {displayText: '► Menu'}, type: 1}
    ]
    let buttonMessage = {
        video: { url: anu.result.video.noWatermark },
        caption: `Download From ${text}`,
        footer: 'Press Button For Menu',
        buttons: buttons,
        headerType: 5
    }
    farhat.sendMessage(m.chat, buttonMessage, { quoted: m })
}
  break;
  case 'tiktokmp3': case 'tiktokaudio': {
    if (isBanned) return m.reply(`*You Have Been Banned*`)
    if (!text) throw 'Masukkan Query Link!'
    m.reply(mess.wait)
    let anu = await fetchJson(`https://api.zahwazein.xyz/downloader/tiktok?apikey=${zenzkey}&url=${text}`)
    if (anu.status == false) return m.reply(anu.result.message)
    let buttons = [
        {buttonId: `${prefix}menu`, buttonText: {displayText: '► Menu'}, type: 1}
    ]
    let buttonMessage = {
        text: `Download From ${text}`,
        footer: 'Press Button For Menu',
        buttons: buttons,
        headerType: 2
    }
    let msg = await farhat.sendMessage(m.chat, buttonMessage, { quoted: m })
    farhat.sendMessage(m.chat, { audio: { url: anu.result.music.play_url }, mimetype: 'audio/mpeg'}, { quoted: msg })
}
break;
case "cekapi" : {
  if (!isCreator) throw mess.owner
  if (isGroup) throw mess.private
  message = `L i s t A p i K e y\n\n_Digiflazz:_\n- ${usernamekey}\n- ${productionkey}\n\n_Atlantic Pedia:_\n- ${atlantickey}\n\n_Vip-Reseller_\n- ${reselerkey}\n- ${reseleridkey}\n\n_Api Games:_\n- ${merchantapigames}\n- ${secretapigames}\n- ${signatureapigames}`
  farhat.sendMessage(m.chat, { text: message })
}
break;
case "setapikey" : {
  if (!isCreator) throw mess.owner
  if (isGroup) throw mess.private
  let provider_0 = text.split("|")[0]
  let key_1 = text.split("|")[1]
  let key_2 = text.split("|")[2]
  let key_3 = text.split("|")[3]
  if (!provider_0) return m.reply('```Masukkan Provider```\n```Provider Yang Tersedia```\n\n```📍 digiflazz```\n```📍 atlanticpedia```\n```📍 vip_reseller```\n```📍 apigames```\n\n```Jadi, contoh:```\n```.setapikey digiflazz|user|product```')
  if (provider_0 === 'atlanticpedia') {
    if (!key_1) return m.reply(`${prefix + command} atlaticpedia|api_key`);
    let atlanticpedia = {
      atlantickey: key_1
    };
    let data = fs.readFileSync('./src/api_key.json');
    let jsonData = JSON.parse(data);
    if (jsonData.atlanticpedia.atlantickey === key_1) {
      m.reply('```Data yang sama telah dimasukkan```');
    } else {
      jsonData.atlanticpedia = atlanticpedia;
      fs.writeFileSync('./src/api_key.json', JSON.stringify(jsonData, null, 2));
      let message = '```Berhasil Update Api Atc```'
      let buttons = [
        {buttonId: prefix + `cekapi`, buttonText: { displayText: 'Cek Api' }, type: 1}
      ]
      farhat.sendButtonText(from, buttons, message, 'Cek api For view changes', m) 
    }
  } else if (provider_0 === 'digiflazz') {
    if (!key_1 && !key_2) return m.reply(`${prefix + command} digiflazz|username_key|production_key`);
    let digiflazz = {
      usernamekey: key_1,
      productionkey: key_2
    };
    let data = fs.readFileSync('./src/api_key.json');
    let jsonData = JSON.parse(data);
    if (jsonData.digiflazz.usernamekey === key_1 && jsonData.digiflazz.productionkey === key_2) {
      m.reply('```Data yang sama telah dimasukkan```');
    } else {
      jsonData.digiflazz = digiflazz;
      fs.writeFileSync('./src/api_key.json', JSON.stringify(jsonData, null, 2));
      let message = '```Berhasil Update Api Digi```'
      let buttons = [
        {buttonId: prefix + `cekapi`, buttonText: { displayText: 'Cek Api' }, type: 1}
      ]
      farhat.sendButtonText(from, buttons, message, 'Cek api For view changes', m) 
    }
  } else if (provider_0 === 'vip_reseller') {
    if (!key_1 && !key_2) return m.reply(`${prefix + command} vip_reseller|resellerkey|reselleridkey`);
    let vip_reseller = {
      resellerkey: key_1,
      reselleridkey: key_2
    };
    let data = fs.readFileSync('./src/api_key.json');
    let jsonData = JSON.parse(data);
    if (jsonData.vip_reseller.reselerkey === key_1 && jsonData.vip_reseller.reselleridkey === key_2) {
      m.reply('```Data yang sama telah dimasukkan```');
    } else {
      jsonData.vip_reseller = vip_reseller;
      fs.writeFileSync('./src/api_key.json', JSON.stringify(jsonData, null, 2));
      let message = '```Berhasil Update Api Vip```'
      let buttons = [
        {buttonId: prefix + `cekapi`, buttonText: { displayText: 'Cek Api' }, type: 1}
      ]
      farhat.sendButtonText(from, buttons, message, 'Cek api For view changes', m) 
    }
  } else if (provider_0 === 'apigames') {
    if (!key_1 && !key_2 && !key_3) return m.reply(`${prefix + command} apigames|merchant|secret|sign`);
    let apigames = {
      merchantapigames: key_1,
      secretapigames: key_2,
      signatureapigames: key_3
    };
    let data = fs.readFileSync('./src/api_key.json');
    let jsonData = JSON.parse(data);
    if (jsonData.apigames.merchantapigames === key_1 && jsonData.apigames.secretapigames === key_2 && jsonData.apigames.signatureapigames === key_3) {
      m.reply('```Data yang sama telah dimasukkan```');
    } else {
      jsonData.apigames = apigames;
      fs.writeFileSync('./src/api_key.json', JSON.stringify(jsonData, null, 2));
      let message = '```Berhasil Update Api Games```'
      let buttons = [
        {buttonId: prefix + `cekapi`, buttonText: { displayText: 'Cek Api' }, type: 1}
      ]
      farhat.sendButtonText(from, buttons, message, 'Retart For Apply Changes', m) 
    }
  } else {
    m.reply('```Provider Tidak Di Temukan```')
  }
}
break;
case 'addowner' : {
  if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
  if (!isCreator) throw mess.owner
  let own = text.replace(/[^0-9]/g, '')
  let own_ = []
  if (fs.existsSync('./src/owner.json')) {
    own_ = JSON.parse(fs.readFileSync('./src/owner.json'))
  }
  if (own_.includes(own)) {
    m.reply('*_Nomor Telah Terdaftar Sebelumnya_*')
  } else {
    owner_database.push(own)
    fs.writeFileSync('./src/owner.json', JSON.stringify(owner_database))
    m.reply(`*_Berhasil Menambahkan ${own} Sebagai Owner_*`)
  }
}
break;
case 'delowner' : {
  if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
  if (!isCreator) throw mess.owner
  let own = text.replace(/[^0-9]/g, '')
  let own_ = JSON.parse(fs.readFileSync('./src/owner.json'))
  let ownp = own_.indexOf(own)
  if (ownp !== -1) {
    owner_database.splice(ownp, 1)
    fs.writeFileSync('./src/owner.json', JSON.stringify(owner_database))
    m.reply(`*_Berhasil Menghapus ${own} Sebagai Owner_*`)
  } else {
    m.reply('*_Nomor Tidak Di Temukan_*')
  }
}
break;
case 'ban' : {
  if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
  if (!isCreator) throw mess.owner
  let bnnd = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let ban_ = []
  if (fs.existsSync('./src/banned.json')) {
    ban_ = JSON.parse(fs.readFileSync('./src/banned.json'))
  }
  if (ban_.includes(bnnd)) {
    m.reply('*_Nomor Telah Terbanned_*')
  } else {
    ban.push(bnnd)
    fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
    m.reply(bnnd)
  }
}
break;
case 'unban' : {
  if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`
  if (!isCreator) throw mess.owner
  let bnnd = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  let ban_ = JSON.parse(fs.readFileSync('./src/banned.json'))
  let unp = ban_.indexOf(bnnd)
  if (unp !== -1) {
    ban.splice(unp, 1)
    fs.writeFileSync('./src/banned.json', JSON.stringify(ban))
    m.reply(bnnd)
  } else {
    m.reply('*_Nomor Tidak Ditemukan_*')
  }
}
break;
case 'listban': case 'lisbanned': {
  if (!isCreator) throw mess.owner
  teks = '*List Banned*\n\n'
  for (let medog of ban) {
    teks += `- ${medog}\n`
  }
  teks += `\n*Total Banned : ${ban.length}*`
  farhat.sendMessage(m.chat, { text: teks.trim() }, 'extendedTextMessage', { quoted: m, contextInfo: { "mentionedJid": ban } })
}
        break;
          default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // farhat.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
              farhat.sendMessage(m.chat, {text: "*_Command Tidak Tersedia Silahkan Ketik .menu Untuk Menampilkan Menu Yang Tersedia Terimakasih!..._*"})
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // farhat.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
              farhat.sendMessage(m.chat, {text: "*_Command Tidak Tersedia Silahkan Ketik .menu Untuk Menampilkan Menu Yang Tersedia Terimakasih!..._*"})
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});