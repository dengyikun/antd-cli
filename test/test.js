/**
 * Created by dyk on 2017/1/14.
 */
const {Builder, By, until, Key} = require('selenium-webdriver')

let driver = new Builder().forBrowser('chrome').build()

driver.manage().window().maximize()

driver
    .get('http://localhost:8080/')
    //用户登录
    .then(_ => ele(Selector.loginUsername).click())
    .then(_ => driver.actions().keyDown(Key.DOWN))
    .then(_ => ele(Selector.loginUsername,10).sendKeys('tester'))
    .then(_ => ele(Selector.loginPassword).sendKeys('123123'))
    .then(_ => ele(Selector.loginChallenge).sendKeys('123'))
    .then(_ => ele(Selector.loginSubmit).click())
    //目录收起展开
    .then(_ => ele(Selector.menuClose, 5).click())
    .then(_ => ele(Selector.menuOpen).click())
    // // 用户个人通知
    // .then(_ => ele(Selector.userNotice).click())
    // .then(_ => ele(Selector.userNoticeCard, 3).click())
    // .then(_ => ele(Selector.userNoticeInfoOk).click())
    // //主页
    // .then(_ => ele(Selector.home).click())
    //用户管理
    .then(_ => ele(Selector.userMgmt).click())
    .then(_ => ele(Selector.userMgmtList).click())
    //添加用户
    .then(_ => ele(Selector.userMgmtListAdd, 3).click())
    .then(_ => ele(Selector.userMgmtInfoUsername, 3).sendKeys('test' + hash()))
    .then(_ => ele(Selector.userMgmtInfoAddGroup).click())
    .then(_ => ele(Selector.userMgmtInfoAddGroupAdmin).click())
    .then(_ => ele(Selector.userMgmtInfoIdCard).sendKeys('52010319921127' + id()))
    .then(_ => ele(Selector.userMgmtInfoPassword).sendKeys('123123'))
    .then(_ => ele(Selector.userMgmtInfoConfirmPassword).sendKeys('123123'))
    .then(_ => ele(Selector.userMgmtInfoName).sendKeys('tester'))
    .then(_ => ele(Selector.userMgmtInfoAddGender).click())
    .then(_ => ele(Selector.userMgmtInfoAddGenderMale).click())
    .then(_ => ele(Selector.userMgmtInfoTelephone).sendKeys(id(11)))
    .then(_ => ele(Selector.userMgmtInfoAddSubmit).click())
    //编辑用户
    .then(_ => ele(Selector.userMgmtListFirst, 6).click())
    .then(_ => ele(Selector.userMgmtInfoTelephone, 3).clear())
    .then(_ => ele(Selector.userMgmtInfoTelephone).sendKeys(id(11)))
    .then(_ => ele(Selector.userMgmtInfoEditSubmit).click())
    //失效生效用户
    .then(_ => ele(Selector.userMgmtListFirstActive, 6).click())
    .then(_ => ele(Selector.userMgmtListFirstActiveOk).click())
    .then(_ => ele(Selector.userMgmtListFirstActive, 6).click())
    .then(_ => ele(Selector.userMgmtListFirstActiveOk).click())
    // //用户管理检索
    // .then(_ => ele(Selector.userMgmtListScreenIdCard, 6).sendKeys('520'))
    // .then(_ => ele(Selector.userMgmtListSearch).click())
    // .then(_ => ele(Selector.userMgmtListResetScreen, 6).click())
    // .then(_ => ele(Selector.userMgmtListScreenName).sendKeys('tester'))
    // .then(_ => ele(Selector.userMgmtListSearch).click())
    // .then(_ => ele(Selector.userMgmtListResetScreen, 6).click())
    // .then(_ => ele(Selector.userMgmtListScreenGroup).click())
    // .then(_ => ele(Selector.userMgmtListScreenGroupPerson).click())
    // .then(_ => ele(Selector.userMgmtListSearch).click())
    // .then(_ => ele(Selector.userMgmtListResetScreen, 6).click())
    // .then(_ => ele(Selector.userMgmtListScreenLocation).click())
    // .then(_ => ele(Selector.userMgmtListScreenLocationProvince).click())
    // .then(_ => ele(Selector.userMgmtListScreenLocationCity).click())
    // .then(_ => ele(Selector.userMgmtListSearch).click())
    // .then(_ => ele(Selector.userMgmtListResetScreen, 6).click())
    // .then(_ => ele(Selector.userMgmtListScreenIdCard).sendKeys('520'))
    // .then(_ => ele(Selector.userMgmtListSearch).click())
    // .then(_ => ele(Selector.userMgmtListScreenName, 6).sendKeys('tester'))
    // .then(_ => ele(Selector.userMgmtListSearch).click())
    // .then(_ => ele(Selector.userMgmtListScreenGroup, 6).click())
    // .then(_ => ele(Selector.userMgmtListScreenGroupPerson).click())
    // .then(_ => ele(Selector.userMgmtListSearch).click())
    // .then(_ => ele(Selector.userMgmtListScreenLocation, 6).click())
    // .then(_ => ele(Selector.userMgmtListScreenLocationProvince).click())
    // .then(_ => ele(Selector.userMgmtListScreenLocationCity).click())
    // .then(_ => ele(Selector.userMgmtListSearch).click())
    .then(_ => driver.sleep(3000))
    .then(_ => driver.quit())

const Selector = {
    loginUsername: '#username',
    loginPassword: '#password',
    loginChallenge: '#challenge',
    loginSubmit: 'button[type=submit]',
    menuClose: '.anticon-menu-fold',
    menuOpen: '.anticon-menu-unfold',
    userNotice: 'span[class*="notice-"]',
    userNoticeCard: '.ant-card',
    userNoticeInfoOk: '.ant-confirm-btns button',
    home: 'a[href="#/home"]',
    userMgmt: '.anticon-user',
    userMgmtList: 'a[href="#/user-mgmt"]',
    userMgmtListScreenIdCard: 'input[placeholder="身份证"]',
    userMgmtListScreenName: 'input[placeholder="姓名"]',
    userMgmtListScreenGroup: 'ant-select',
    userMgmtListScreenGroupPerson: 'body > div > div > div > div > ul > li:nth-child(4)',
    userMgmtListScreenLocation: '.ant-spin-nested-loading > div > div > div:nth-child(1) > div:nth-child(4) > span',
    userMgmtListScreenLocationProvince: 'body > div:nth-child(5) > div > div > div > ul > li:nth-child(1)',
    userMgmtListScreenLocationCity: 'body > div:nth-child(5) > div > div > div > ul:nth-child(2) > li:nth-child(1)',
    userMgmtListSearch: '.ant-spin-nested-loading > div > div > div:nth-child(1) > div:nth-child(5) > button:nth-child(1)',
    userMgmtListResetScreen: '.ant-spin-nested-loading > div > div > div:nth-child(1) > div:nth-child(5) > button:nth-child(2)',
    userMgmtListAdd: '.ant-spin-nested-loading > div > div > div:nth-child(2) > div:nth-child(2) > button',
    userMgmtListFirst: '.ant-spin-nested-loading table > tbody > tr:nth-child(3) > td:nth-child(2) > a',
    userMgmtListFirstActive: '.ant-spin-nested-loading table > tbody > tr:nth-child(3) > td:nth-child(7) > span > a:nth-child(1)',
    userMgmtListFirstActiveOk: 'body div > div.ant-modal-wrap > div > div.ant-modal-content > div > div > div.ant-confirm-btns > button',
    userMgmtInfoUsername: '#username',
    userMgmtInfoAddGroup: '.ant-spin-nested-loading > div > form > div:nth-child(2) > div:nth-child(1) .ant-select:nth-child(1)',
    userMgmtInfoAddGroupAdmin: 'body > div > div > div > div > ul > li:nth-child(1)',
    userMgmtInfoIdCard: '#id_card',
    userMgmtInfoPassword: '#password',
    userMgmtInfoConfirmPassword: '#confirmPassword',
    userMgmtInfoName: '#name',
    userMgmtInfoAddGender: '.ant-spin-nested-loading > div > form > div:nth-child(3) > div:nth-child(4) .ant-select:nth-child(1)',
    userMgmtInfoAddGenderMale: 'body > div:nth-child(5) > div > div > div > ul > li:nth-child(1)',
    userMgmtInfoTelephone: '#telephone',
    userMgmtInfoAddSubmit: '.ant-spin-nested-loading > div > form > div:nth-child(3) > div:nth-child(27) > button',
    userMgmtInfoEditSubmit: '.ant-spin-nested-loading > div > form > div:nth-child(3) > div:nth-child(25) > button:nth-child(4)',
}

function ele(selector, timeout) {
    if (isNaN(timeout)) {
        timeout = 1
    }
    driver.sleep(timeout * 1000)
    return driver.findElement(By.css(selector))
}

function hash(num) {
    let hash = ""
    if (isNaN(num)) {
        num = 6
    }
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < num; i++)
        hash += possible.charAt(Math.floor(Math.random() * possible.length))
    return hash
}

function id(num) {
    let id = ''
    if (isNaN(num)) {
        num = 4
    }
    while (id.length < num) {
        id += Math.random().toString().substr(2, num)
        id.substr(0, num)
    }
    return id
}