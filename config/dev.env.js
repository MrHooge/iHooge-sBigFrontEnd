'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const QYAPI = {
  member: "'https://member.api.qiyun88.cn'",
  user: "'https://user.api.qiyun88.cn'",
  infos: "'https://infos.api.qiyun88.cn'",
  // infos: "'http://192.168.6.61:10030'",
  pay: "'https://pay.api.qiyun88.cn'",
  ticket: "'https://ticket.api.qiyun88.cn'",
  lottery: "'https://lottery.api.qiyun88.cn'"
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: QYAPI,
})
