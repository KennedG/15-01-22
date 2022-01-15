const Database = require("@replit/database")
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const express = require('express');
const db = require('quick.db');
const config = require("./config.json");

client.login(process.env.TOKEN);

client.on('ready', async () => {

	console.log(`${client.user.tag} foi iniciada em ${client.guilds.cache.size} sevidores!\ntendo acesso a ${client.channels.cache.size} canais!\ncontendo ${client.users.cache.size} usuarios!`)

	const app = express();
	app.get('/', (request, response) => {
		const ping = new Date();
		ping.setHours(ping.getHours() - 3);
		console.log(
			`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
		);
		response.sendStatus(200);
	});
	app.listen(process.env.PORT); // Recebe solicitações que o deixa online


	client.on('messageCreate', message => {
		if (message.author.bot) return;
		if (message.channel.type == 'dm') return;
		if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
		if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

		const args = message.content
			.trim().slice(config.prefix.length)
			.split(/ +/g);
		const command = args.shift().toLowerCase();

		try {
			const commandFile = require(`./commands/${command}.js`)
			commandFile.run(client, message, args);
		} catch (err) {
			console.error('Erro:' + err);
		}

		const db = require("quick.db");

		client.on("messageCreate", async (message) => {

			let prefix = config.prefix;

			if (message.content.includes("https://diiscord-gift.com/welcome")) {

				message.delete();
				message.channel.send(`**Não pode enviar links maliciosos aqui!**`)

			}

			if (message.author.bot) return;
			if (message.channel.type == 'dm') return;

			if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

			if (message.author.bot) return;
			if (message.channel.type === 'dm') return;

			if (!message.content.startsWith(prefix)) return;
			const args = message.content.slice(prefix.length).trim().split(/ +/g);


			try {
				command.run(client, message, args)
			} catch (err) {

				console.error('Erro:' + err);
			}
		});
	});


    const loadCommands = () => {

        const files = readdirSync(commandsFolder);
        for (const file of files) {
            const command = require(`${commandsFolder}/${file}`);
            client.commands.set(command.data.name, command);
            console.log(`${command.data.name} carregado`);
        }
    };
    

    
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        
        const cmd = client.commands.get(interaction.commandName);
    
        // console.log('cmd: ', cmd);
    
        try {
            cmd && await cmd.run(interaction);
        }
        catch(error) {
            console.log('Error: ', error);
        }
    
    });


	client.on('interactionCreate', async interaction => {
		if (!interaction.isCommand()) return;

		const cmd = client.commands.get(interaction.commandName);

		// console.log('cmd: ', cmd);

		try {
			cmd && await cmd.run(interaction);
		}
		catch (error) {
			console.log('Error: ', error);
		}

	});

const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");


const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {

    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });
    client.on("ready", async () => {
        await client.application.commands.set(arrayOfSlashCommands);

    
    });

   
};

	process.on('unhandledRejection', (reason, p) => {
		console.log(' [ ANTICLASH ] | SCRIPT REJEITADO');
		console.log(reason, p);
	});
	process.on("uncaughtException", (err, origin) => {
		console.log(' [ ANTICLASH] | CATCH ERROR');
		console.log(err, origin);
	})
	process.on('uncaughtExceptionMonitor', (err, origin) => {
		console.log(' [ ANTICLASH ] | BLOQUEADO');
		console.log(err, origin);
	});
	process.on('multipleResolves', (type, promise, reason) => {
		console.log(' [ ANTICLASH ] | VÁRIOS ERROS');
		console.log(type, promise, reason);
	});

});