#### 写在前面
> 官网：[http://mockjs.com/](http://mockjs.com/)  
> 官网文档：[https://github.com/nuysoft/Mock/wiki](https://github.com/nuysoft/Mock/wiki)

> 作者：要没时间了\_  
> 链接：[https://juejin.im/post/5cf726b5e51d454fbf5409bc](https://juejin.im/post/5cf726b5e51d454fbf5409bc)  

#### URL Params参数格式
> /#/:typeFullScreen/:code  or  
>/#/:code
注意：这个操作会留下历史记录
##### typeFullScreen: code | output 全屏化
```
code: 全屏化打开输入框
output: 全屏化打开生成框
```
###### code
你所需要生成的代码串
[示例请看这里](/#/{%20%22data|5%22:%20[%20{%20%22name%22:%20%22@cname()%22,%20%22uid%22:%20%22@guid()%22,%20%22address%22:%20%22@county()%22,%20%22avatar%22:%20%22@Image('100x100','@color')%22,%20%22birthday%22:%20%22@date('yyyy-MM-dd%20HH:mm:ss')%22,%20%22create_time%22:%20%22@date('yyyy-MM-dd%20HH:mm:ss')%22,%20%22update_time%22:%20%22@date('yyyy-MM-dd%20HH:mm:ss')%22,%20%22description%22:%20%22@cword(20,%2050)%22%20}%20]%20})

#### 格式
- 'name|min-max': value
- 'name|count': value
- 'name|min-max.dmin-dmax': value
- 'name|min-max.dcount': value
- 'name|count.dmin-dmax': value
- 'name|count.dcount': value
- 'name|+step': value

#### Random完整方法如下
Type   |Method
-------|--------
[Basic](https://github.com/nuysoft/Mock/wiki/Basic)|[boolean](https://github.com/nuysoft/Mock/wiki/Basic#randomboolean-min-max-current-), [natural](https://github.com/nuysoft/Mock/wiki/Basic#randomnatural-min-max-), [integer](https://github.com/nuysoft/Mock/wiki/Basic#randominteger-min-max-), [float](https://github.com/nuysoft/Mock/wiki/Basic#randomfloat-min-max-dmin-dmax-), [character](https://github.com/nuysoft/Mock/wiki/Basic#randomcharacter-pool-), [string](https://github.com/nuysoft/Mock/wiki/Basic#randomstring-pool-min-max-), [range](https://github.com/nuysoft/Mock/wiki/Basic#randomrange-start-stop-step-)
[Date](https://github.com/nuysoft/Mock/wiki/Date)|[date](https://github.com/nuysoft/Mock/wiki/Date#randomdate-format-), [time](https://github.com/nuysoft/Mock/wiki/Date#randomtime-format-), [datetime](https://github.com/nuysoft/Mock/wiki/Date#randomdatetime-format-), [now](https://github.com/nuysoft/Mock/wiki/Date#randomnow-unit-format-)
[Image](https://github.com/nuysoft/Mock/wiki/Image)|[image](https://github.com/nuysoft/Mock/wiki/Image#randomimage-size-background-foreground-format-text-), [dataImage](https://github.com/nuysoft/Mock/wiki/Image#randomdataimage-size-text-)
[Color](https://github.com/nuysoft/Mock/wiki/Color)|[color](https://github.com/nuysoft/Mock/wiki/Color#randomcolor), [hex](https://github.com/nuysoft/Mock/wiki/Color#randomhex), [rgb](https://github.com/nuysoft/Mock/wiki/Color#randomrgb), [rgba](https://github.com/nuysoft/Mock/wiki/Color#randomrgba), [hsl](https://github.com/nuysoft/Mock/wiki/Color#randomhsl)
[Text](https://github.com/nuysoft/Mock/wiki/Text)|[paragraph](https://github.com/nuysoft/Mock/wiki/Text#randomparagraph-min-max-), [sentence](https://github.com/nuysoft/Mock/wiki/Text#randomsentence-min-max-), [word](https://github.com/nuysoft/Mock/wiki/Text#randomword-min-max-), [title](https://github.com/nuysoft/Mock/wiki/Text#randomtitle-min-max-), [cparagraph](https://github.com/nuysoft/Mock/wiki/Text#randomcparagraph-min-max-), [csentence](https://github.com/nuysoft/Mock/wiki/Text#randomcsentence-min-max-), [cword](https://github.com/nuysoft/Mock/wiki/Text#randomcword-pool-min-max-), [ctitle](https://github.com/nuysoft/Mock/wiki/Text#randomctitle-min-max-)
[Name](https://github.com/nuysoft/Mock/wiki/Name)|[first](https://github.com/nuysoft/Mock/wiki/Name#randomfirst), [last](https://github.com/nuysoft/Mock/wiki/Name#randomlast), [name](https://github.com/nuysoft/Mock/wiki/Name#randomname-middle-), [cfirst](https://github.com/nuysoft/Mock/wiki/Name#randomcfirst), [clast](https://github.com/nuysoft/Mock/wiki/Name#randomclast), [cname](https://github.com/nuysoft/Mock/wiki/Name#randomcname)
[Web](https://github.com/nuysoft/Mock/wiki/Web)|[url](https://github.com/nuysoft/Mock/wiki/Web#randomurl-protocol-host-), [domain](https://github.com/nuysoft/Mock/wiki/Web#randomdomain), [protocol](https://github.com/nuysoft/Mock/wiki/Web#randomprotocol), [tld](https://github.com/nuysoft/Mock/wiki/Web#randomtld), [email](https://github.com/nuysoft/Mock/wiki/Web#randomemail-domain-), [ip](https://github.com/nuysoft/Mock/wiki/Web#randomip)
[Address](https://github.com/nuysoft/Mock/wiki/Address)|[region](https://github.com/nuysoft/Mock/wiki/Address#randomregion), [province](https://github.com/nuysoft/Mock/wiki/Address#randomprovince), [city](https://github.com/nuysoft/Mock/wiki/Address#randomcity-prefix-), [county](https://github.com/nuysoft/Mock/wiki/Address#randomcounty-prefix-), [zip](https://github.com/nuysoft/Mock/wiki/Address#randomzip)
[Helper](https://github.com/nuysoft/Mock/wiki/Helper)|[capitalize](https://github.com/nuysoft/Mock/wiki/Helper#randomcapitalize-word-), [upper](https://github.com/nuysoft/Mock/wiki/Helper#randomupper-str-), [lower](https://github.com/nuysoft/Mock/wiki/Helper#randomlower-str-), [pick](https://github.com/nuysoft/Mock/wiki/Helper#randompick-arr-), [shuffle](https://github.com/nuysoft/Mock/wiki/Helper#randomshuffle-arr-)
[Miscellaneous](https://github.com/nuysoft/Mock/wiki/Miscellaneous)|[guid](https://github.com/nuysoft/Mock/wiki/Miscellaneous#randomguid), [id](https://github.com/nuysoft/Mock/wiki/Miscellaneous#randomid), [increment](https://github.com/nuysoft/Mock/wiki/Miscellaneous#randomincrement-step-)

#### Random快速随机数据
``` js
{
    // 随机生成布尔类型
    "Boolean" : "@boolean",
    // 随机生成1到100之间自然数
    "Natural" : "@natural(1, 100)",
    // 生成1到100之间的整数
    "Integer" : "@integer(1, 100)",
    // 生成0到100之间的浮点数,小数点后尾数为0到5位
    "Float" : "@float(0, 100, 0, 5)",
    // 在aeiou中，生成随机字符，不传参表示生成随机字符
    "Character" : "@character('aeiou')",
    // 生成2到10个字符之间的字符串
    "String" : "@string( 2, 10)",
    // 生成一个数组，数组元素从0开始到10结束，间隔为2
    "Range" : "@range(0, 10, 2)",
    // 生成一个随机日期,可加参数定义日期格式，默认yyyy-MM-dd
    "Date" : "@date('yyyy yy y MM M dd d HH:mm:ss')",
    // 生成一个颜色16进制随机值
    "Color1" : "@color",
    // 生成一个颜色rgb随机值
    "Color2" : "@rgb",
    // 生成2至5个句子的文本
    "Paragraph" : "@paragraph(2, 5)",
    // 生成3至5个单词组成的一个句子
    "Sentence" : "@sentence(3, 5)",  
    // 生成3-5个字母组成的单词
    "World" : "@word(3, 5)",
    // 生成3-5个单词组成的标题
    "title" : "@title(3, 5)",
    // 生成2至5个句子的中文文本
    "cParagraph": "@cparagraph(2, 5)",
    // 生成3至5个词语组成的一个中文句子
    "cSentence" : "@csentence(3, 5)",
    // 生成3-5个字组成的中文词语
    "cWorld" : "@cword(3, 5)",
    // 生成3-5个词语组成的中文标题
    "ctitle" : "@ctitle(3, 5)",
    // 生成姓名
    "Name" : "@name",
    // 生成中文姓名
    "cName" : "@cname",
    // 生成url地址
    "Url" : "@url",
    // 生成邮箱
    "Email" : "@email",
    // 生成省 市 县组成的地址
    "Address" : "@county(true)",
    // 生成Guid值
    "Guid" : "@guid()",
    // 图片
    "Image" : "@Image('100x100','@color')"
}
```
