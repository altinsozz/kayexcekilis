const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Bu komudu kullanmak için **Yönetici** Yetkisine sahip olman lazım.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: Mesajın İDsini gir!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Böyle bir hediye bulamadım `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('Çekiliş daha kısa sürede bitecek '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' saniye...');
    })
    .catch((e) => {
        if(e.startsWith(`Bu İD'nin çekilişi ${giveaway.messageID} zaten bitti.`)){
            message.channel.send('Bu çekiliş zaten bitmiş!');
        } else {
            console.error(e);
            message.channel.send('Bir hata oluştu...');
        }
    });

};