import Handler from './handler'


const { gen } = Handler
/*
    * Mock.mock( template )
    * Mock.mock( function() )
    * Mock.mock( rurl, template )
    * Mock.mock( rurl, function(options) )
    * Mock.mock( rurl, rtype, template )
    * Mock.mock( rurl, rtype, function(options) )

    根据数据模板生成模拟数据。
*/

export default {
    mock: function (rurl, rtype, template) {
        // Mock.mock(template)
        console.log(1)
        if (arguments.length === 1) {
            return gen(rurl)
        }
        // Mock.mock(rurl, template)
        console.log(2)
        if (arguments.length === 2) {
            template = rtype
            rtype = undefined
        }

        Mock._mocked[rurl + (rtype || '')] = {
            rurl: rurl,
            rtype: rtype,
            template: template
        }
        return Mock
    }
}