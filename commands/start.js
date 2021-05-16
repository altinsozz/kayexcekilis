const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: Bu komudu kullanabilmek için **Yönetici** yetkisine sahip olman gerekli.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: Lütfen bir kanal gir!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Lütfen bir zaman yaz!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Geçerli bir kazanan sayısı girmelisin!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: Lütfen bir hediye gir!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ BİTTİ** 🎉🎉",
            timeRemaining: "Kalan Süre: **{duration}**!",
            inviteToParticipate: "Katılmak için 🎉 tepkisine tıkla!",
            winMessage: "Tebrikler, {winners}! sen kazandın **{prize}**!",
            embedFooter: "Çekiliş",
            noWinner: "Çekiliş iptal edildi, Yeterli kişi katılmadı.",
            hostedBy: "Tarafından: {user}",
            winners: "Kazanan(lar)",
            endedAt: "Bitme Tarihi",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`Çekiliş bu kanalda başlatıldı! ${giveawayChannel}!`);

};