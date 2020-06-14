const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const welcomeChannelName = "반갑다냥";
const byeChannelName = "반갑다냥";
const welcomeChannelComment = "님 어서오세요.";
const byeChannelComment = "님 안녕히가세요.";

client.on('ready', () => {
  console.log('켰다.');
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const newUser = member.user;
  const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);

  welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);

  member.addRole(guild.roles.find(role => role.name == "캣닢"));
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const deleteUser = member.user;
  const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);

  byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
});

client.on('message', (message) => {
  if(message.author.bot) return;

  if(message.content == 'ping') {
    return message.reply('pong');
  }

  if(message.content == '하린봇주소') {
    let img = 'https://kin-phinf.pstatic.net/20120411_44/1334141105403lFoDx_JPEG/%BB%F5%B3%A2%B0%ED%BE%E7%C0%CC4.jpg?type=w750';
    let embed = new Discord.RichEmbed()
      .setTitle('주소')
      .setURL('http://www.naver.com')
      .setAuthor('승호', img, 'http://www.naver.com')
      .setThumbnail(img)
      .addBlankField()
      .addField('하린이 방송국 주소', 'http://bj.afreecatv.com/lovely000')
      .addBlankField()
      .setTimestamp()
      .setFooter('승호가 만듬', img)

    message.channel.send(embed)
  } else if(message.content == '하린봇명령어') {
    let helpImg = 'https://kin-phinf.pstatic.net/20120411_44/1334141105403lFoDx_JPEG/%BB%F5%B3%A2%B0%ED%BE%E7%C0%CC4.jpg?type=w750';
    let commandList = [
      {name: '테스트', desc: '봇 온라인 테스트'},
      {name: '하린봇주소', desc: '방송국 주소'},
      {name: '하린봇명령어', desc: '하린봇 전체 명령어'},
      {name: '!전체공지', desc: 'dm으로 전체 공지 보내기'},
    ];
    let commandStr = '';
    let embed = new Discord.RichEmbed()
      .setAuthor('Help of 하린 BOT', helpImg)
      .setColor('#186de6')
      .setFooter(`하린 BOT ❤️`)
      .setTimestamp()
    
    commandList.forEach(x => {
      commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
    });

    embed.addField('Commands: ', commandStr);

    message.channel.send(embed)
  }

  if(message.content.startsWith('!전체공지')) {
    if(checkPermission(message)) return
    if(message.member != null) { // 채널에서 공지 쓸 때
      let contents = message.content.slice('!전체공지'.length);
      message.member.guild.members.array().forEach(x => {
        if(x.user.bot) return;
        x.user.send(`<@${message.author.id}> ${contents}`);
      });
  
      return message.reply('공지를 전송했습니다.');
    } else {
      return message.reply('채널에서 실행해주세요.');
    }
  }
});

function checkPermission(message) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) {
    message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
    return true;
  } else {
    return false;
  }
}

function changeCommandStringLength(str, limitLen = 8) {
  let tmp = str;
  limitLen -= tmp.length;

  for(let i=0;i<limitLen;i++) {
      tmp += ' ';
  }

  return tmp;
}


client.login(token);