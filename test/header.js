var tap = require("tap")
var TarHeader = require("../lib/header.js")
var tar = require("../tar.js")
var fs = require("fs")


var headers =
  { "a.txt file header":
    [ "612e747874000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303036343420003035373736312000303030303234200030303030303030303430312031313635313336303333332030313234353100203000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000757374617200303069736161637300000000000000000000000000000000000000000000000000007374616666000000000000000000000000000000000000000000000000000000303030303030200030303030303020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    , { cksumValid: true
      , name: 'a.txt'
      , mode: 420
      , uid: 24561
      , gid: 20
      , size: 257
      , mtime: 1319493851
      , cksum: 5417
      , type: '0'
      , linkname: ''
      , ustar: 'ustar'
      , ustarver: '00'
      , uname: 'isaacs'
      , gname: 'staff'
      , devmaj: 0
      , devmin: 0
      , prefix: ''
      , fill: '' }
    ]

  , "omega pax": // the extended header from omega tar.
    [ "5061784865616465722fcea92e74787400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303036343420003035373736312000303030303234200030303030303030303137302031313534333731303631312030313530353100207800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000757374617200303069736161637300000000000000000000000000000000000000000000000000007374616666000000000000000000000000000000000000000000000000000000303030303030200030303030303020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    , { cksumValid: true
      , name: 'PaxHeader/Ω.txt'
      , mode: 420
      , uid: 24561
      , gid: 20
      , size: 120
      , mtime: 1301254537
      , cksum: 6697
      , type: 'x'
      , linkname: ''
      , ustar: 'ustar'
      , ustarver: '00'
      , uname: 'isaacs'
      , gname: 'staff'
      , devmaj: 0
      , devmin: 0
      , prefix: ''
      , fill: '' } ]

  , "omega file header":
    [ "cea92e7478740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303036343420003035373736312000303030303234200030303030303030303030322031313534333731303631312030313330373200203000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000757374617200303069736161637300000000000000000000000000000000000000000000000000007374616666000000000000000000000000000000000000000000000000000000303030303030200030303030303020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    , { cksumValid: true
      , name: 'Ω.txt'
      , mode: 420
      , uid: 24561
      , gid: 20
      , size: 2
      , mtime: 1301254537
      , cksum: 5690
      , type: '0'
      , linkname: ''
      , ustar: 'ustar'
      , ustarver: '00'
      , uname: 'isaacs'
      , gname: 'staff'
      , devmaj: 0
      , devmin: 0
      , prefix: ''
      , fill: '' } ]

  , "foo.js file header":
    [ "666f6f2e6a730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303036343420003035373736312000303030303234200030303030303030303030342031313534333637303734312030313236313700203000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000757374617200303069736161637300000000000000000000000000000000000000000000000000007374616666000000000000000000000000000000000000000000000000000000303030303030200030303030303020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    , { cksumValid: true
      , name: 'foo.js'
      , mode: 420
      , uid: 24561
      , gid: 20
      , size: 4
      , mtime: 1301246433
      , cksum: 5519
      , type: '0'
      , linkname: ''
      , ustar: 'ustar'
      , ustarver: '00'
      , uname: 'isaacs'
      , gname: 'staff'
      , devmaj: 0
      , devmin: 0
      , prefix: ''
      , fill: '' }
    ]

  , "b.txt file header":
    [ "622e747874000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030303036343420003035373736312000303030303234200030303030303030313030302031313635313336303637372030313234363100203000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000757374617200303069736161637300000000000000000000000000000000000000000000000000007374616666000000000000000000000000000000000000000000000000000000303030303030200030303030303020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    , { cksumValid: true
      , name: 'b.txt'
      , mode: 420
      , uid: 24561
      , gid: 20
      , size: 512
      , mtime: 1319494079
      , cksum: 5425
      , type: '0'
      , linkname: ''
      , ustar: 'ustar'
      , ustarver: '00'
      , uname: 'isaacs'
      , gname: 'staff'
      , devmaj: 0
      , devmin: 0
      , prefix: ''
      , fill: '' }
    ]
  }

tap.test("parsing", function (t) {
  Object.keys(headers).forEach(function (name) {
    var h = headers[name]
      , header = new Buffer(h[0], "hex")
      , expect = h[1]
      , parsed = new TarHeader(header)

    t.has(parsed, expect, "parse " + name)
  })
  t.end()
})

tap.test("encoding", function (t) {
  Object.keys(headers).forEach(function (name) {
    var h = headers[name]
      , expect = new Buffer(h[0], "hex")
      , encoded = TarHeader.encode(h[1])

    // might have slightly different bytes, since the standard
    // isn't very strict, but should have the same semantics
    // checkSum will be different, but cksumValid will be true

    var th = new TarHeader(encoded)
    delete h[1].block
    delete h[1].needExtended
    delete h[1].cksum
    t.has(th, h[1], "fields "+name)
  })
  t.end()
})

// test these manually.  they're a bit rare to find in the wild
tap.test("parseNumeric tests", function (t) {
  var parseNumeric = TarHeader.parseNumeric
    , numbers =
      { "303737373737373700": 2097151
      , "30373737373737373737373700": 8589934591
      , "303030303036343400": 420
      , "800000ffffffffffff": 281474976710655
      , "ffffff000000000001": -281474976710654
      , "ffffff000000000000": -281474976710655
      , "800000000000200000": 2097152
      , "8000000000001544c5": 1393861
      , "ffffffffffff1544c5": -15383354 }
  Object.keys(numbers).forEach(function (n) {
    var b = new Buffer(n, "hex")
    t.equal(parseNumeric(b), numbers[n], n + " === " + numbers[n])
  })
  t.end()
})
