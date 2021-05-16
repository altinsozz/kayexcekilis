const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor("Kayex")
      .setTitle("Komut Listesi")
      .setDescription("Aşağıda Bot ile yapabileceğiniz Komutlar yer almaktadır, Şu anda yalnızca 6 komut mevcut (çekiliş için.), yakında daha fazla komut eklenecek.")
      .addField("🎁 Giveaway 🎁","start [kanal ismi] [zaman] [kazananlar] [ödül]\nreroll [mesaj idsi]\nend [mesaj idsi]")
      .addField("Örnek", "k!start #giveaway 5m 1 Test\nk!end Test\nk!reroll Test")
      .addField("Diğer", "ping", true)
      .addField("ℹ Bilgi ℹ", "status", true)
      .setTimestamp()
      .setFooter(`Komudu isteyen ${message.author.tag}`, client.user.displayAvatarURL());
    message.channel.send("**Çekiliş Komutları Direkt Mesajlara gönderildi! 💌, DM'leri kontrol et**");

    return message.author.send(help);
}

module.exports.help = {
  name: "çekiliş"
}
