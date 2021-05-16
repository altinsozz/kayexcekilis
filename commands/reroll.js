const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Bu komudu kullanabilmek için **Yönetici** Yetkisine sahip olman gerek.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x İD Bulunamadı!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Bir hediye bulamadım `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.channel.send('Çekiliş yeniden çekildi!');
    })
    .catch((e) => {
        if(e.startsWith(`Bu İD'nin çekilişi ${giveaway.messageID} daha bitmedi.`)){
            message.channel.send('Çekiliş daha bitmedi!');
        } else {
            console.error(e);
            message.channel.send('Bir hata oluştu...');
        }
    });

};