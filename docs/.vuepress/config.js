module.exports ={
    title: "zzt's blog",
    description: "vuepress blog",
    themeConfig:{
        nav: [
            {text: 'homepage', link:'/'},
            {text: 'blogs', link: '/blogs/'},
        ],
        sidebar: {
            '/': [
                {
                    title: 'home',
                    collapsable: false,
                    children: [
                        'Golang Docker部署实践',
                        'Go 终于可以不翻墙下载golang.org 包了',
                        'Go 原生Http服务器实现原理'
                        
                    ]
                }
            ]
        },
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
    }
}