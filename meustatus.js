const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Significado dos meus status`)
    .setDescription(`Olá, este comando mostra os significados dos meus status, olhe abaixo:
    
    <a:online:925875488944164894> __Online__: ***Quer dizer que eu estou ligado e 100% funcionando, sem nenhum erro!***
    
    
    <:badgePartner:909263598788968478> __Transmitindo__: ***Mesma coisa do "Online"***


    <:az_moderador_old:909264644168900629> __Não Pertubar__: ***Quer dizer que eu estou 70%, que meu criador está fazendo manutenção de argumentos, mais tudo funcionando ainda!***
    
    <:off:932037041498243113> __Ausente/Afk__: ***Quer dizer que estou funcionando 40%, que tem muitas coisas para meu criador melhorar, manutenção de comandos e argumentos!***
    
    <:status_offline:932037217906479144> __Offline__: ***Quer dizer que não estou funcionando e não tem previsão até quando eu vou voltar, ou manutenção de comandos e argumentos mais intensa!***`)
    .setFooter(`© Gizmo#8886`)
  message.channel.send(embed);
};