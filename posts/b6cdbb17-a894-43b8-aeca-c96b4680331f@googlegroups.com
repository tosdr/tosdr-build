{"text":"Title: [Good] All materials and content in the public domain\nTopic: ownership\nSummary: Gittip itself is open source, and all of its static content is available under the CC0 license.\nScore: 100\n\n> The Site and all content and other materials on the Site, including, without limitation, the Gittip logo and all designs, text, graphics, pictures, information, data, software, sound files, other files and the selection and arrangement thereof (collectively, \"Site Materials\") are dedicated to the public domain via the CC0 1.0 Universal Public Domain Dedication.\n\nNote: This is a part of the series of ratings as a part of gittip issue #1898.\n\nhttps://github.com/gittip/www.gittip.com/issues/1898\n\nReferences:\n\nGittip Terms of Service \n\nhttps://www.gittip.com/about/terms/\n\nGittip Privacy Policy\n\nhttps://www.gittip.com/about/privacy/\n\nLicense Statement:\n\nI hereby license this contribution under CC BY-SA 3.0 license in accordance with the TOS;DR contributor terms. Where possible, I waive all rights to this contribution under the CC0 Public Domain license.\n\nhttp://tosdr.org/legal.html#contributor-terms\n\n-- \ntosdr.org | twitter.com/tosdr | github.com/tosdr\n--- \nYou received this message because you are subscribed to the Google Groups \"Terms of Service; Didn't Read\" group.\nTo unsubscribe from this group and stop receiving emails from it, send an email to tosdr+unsubscribe@googlegroups.com.\nTo post to this group, send email to tosdr@googlegroups.com.\nVisit this group at http://groups.google.com/group/tosdr.\nFor more options, visit https://groups.google.com/groups/opt_out.\n","headers":{"return-path":"<tosdr+bncBCHZDMUPVQLBBVXCQGLQKGQENCVZS5Y@googlegroups.com>","delivered-to":"anything@michielbdejong.com","received":["from spool.mail.gandi.net (mspool3-d.mgt.gandi.net [10.0.21.134]) by nmboxes77-d.mgt.gandi.net (Postfix) with ESMTP id 4A85241439 for <anything@michielbdejong.com>; Thu, 23 Jan 2014 02:33:16 +0100 (CET)","from mfilter3-d.gandi.net (mfilter3-d.gandi.net [217.70.178.133]) by spool.mail.gandi.net (Postfix) with ESMTP id 47F7C116496 for <anything@michielbdejong.com>; Thu, 23 Jan 2014 02:33:16 +0100 (CET)","from spool.mail.gandi.net ([10.0.21.134]) by mfilter3-d.gandi.net (mfilter3-d.gandi.net [10.0.15.180]) (amavisd-new, port 10024) with ESMTP id GSzndq4hNBqV for <anything@michielbdejong.com>; Thu, 23 Jan 2014 02:33:15 +0100 (CET)","from mail-pd0-x237.google.com (mail-pd0-x237.google.com [IPv6:2607:f8b0:400e:c02::237]) by spool.mail.gandi.net (Postfix) with ESMTPS id B58AB116B7E for <michiel@michielbdejong.com>; Thu, 23 Jan 2014 02:33:11 +0100 (CET)","by mail-pd0-f183.google.com with SMTP id q10sf238373pdj.20 for <michiel@michielbdejong.com>; Wed, 22 Jan 2014 17:33:10 -0800 (PST)","by 10.140.17.75 with SMTP id 69ls222699qgc.34.gmail; Wed, 22 Jan 2014 17:33:10 -0800 (PST)"],"x-virus-scanned":"Debian amavisd-new at mfilter3-d.gandi.net","dkim-signature":["v=1; a=rsa-sha256; c=relaxed/relaxed; d=googlegroups.com; s=20120806; h=date:from:to:message-id:subject:mime-version:x-original-sender :reply-to:precedence:mailing-list:list-id:list-post:list-help :list-archive:sender:list-subscribe:list-unsubscribe:content-type :content-transfer-encoding; bh=+k5zbmancJAonXQAGtiDPiLduKsrPud7I9yXGl5BLHw=; b=RZFjdXQqbJ5zO066HY9aOh9CT8W2Fe3yGv4eAQUrOl/w96S4tG21y3kCfD4iZ/9wkn QGTu4kzIhEq9pPH5i2O375zNvU917BRCvmTMKqaGVVdpvV+eoKRvvKKPuujeHVVfTaKr cEv+QEdehl8NHpr39mXzMBNNrg31j1eiRPaXG8IhLWlHPDXWnBRNQNCuRdYA2RKLlAAF LebErp3m34RT6CQWpjbscY5RrtvtLS9C7mEn0fee7gQmypNrQ6xC2eLbSn0bHuJFwZtQ x9GNPqQ6ijrAhXKbzEHldm5fruowwMPwZuaY5MNqeyLa3oBYYMSq5ayExboclEw1hpEo mLIg==","v=1; a=rsa-sha256; c=relaxed/relaxed; d=gmail.com; s=20120113; h=date:from:to:message-id:subject:mime-version:x-original-sender :reply-to:precedence:mailing-list:list-id:list-post:list-help :list-archive:sender:list-subscribe:list-unsubscribe:content-type :content-transfer-encoding; bh=+k5zbmancJAonXQAGtiDPiLduKsrPud7I9yXGl5BLHw=; b=Rq7TMKPBSLsMYksFLWSX2CqW7bS2JeWan42E3921rVVO8A847xtdZFpEtUoY7juT9/ uSqaAyaoyJPHtfdCI+7zFiU4bJ7PKJRmV/echzqYqIiFpictc92h7QwxaycotWu1fwgZ b+HzCJTahd81d3gnWm1y0m9psxAJnQie7Fmvi/V36E5iBRy8ApHL1CUSPv5aD2Dn7ZZL 4H6ebURDxqPYBZGge4Co2KKTfc876oM6w1nc4EtSwBEOSFxgTfTLST3Sq0lvtNTWcnLC EtATWSRy5t/o56AlKxiy0SFL+jgdOUb75NvbJJ8jcWqa0/aw83CwJUXqU/T8Wxh1DBGh D95g=="],"x-received":["by 10.140.21.135 with SMTP id 7mr91777qgl.17.1390440790221; Wed, 22 Jan 2014 17:33:10 -0800 (PST)","by 10.140.107.138 with SMTP id h10mr104382qgf.2.1390440789962; Wed, 22 Jan 2014 17:33:09 -0800 (PST)"],"x-beenthere":"tosdr@googlegroups.com","date":"Wed, 22 Jan 2014 17:33:09 -0800 (PST)","from":"colindean@gmail.com","to":"tosdr@googlegroups.com","message-id":"<b6cdbb17-a894-43b8-aeca-c96b4680331f@googlegroups.com>","subject":"[tosdr:2887] Gittip: [Good] All materials and content in the public domain","mime-version":"1.0","x-original-sender":"colindean@gmail.com","reply-to":"tosdr@googlegroups.com","precedence":"list","mailing-list":"list tosdr@googlegroups.com; contact tosdr+owners@googlegroups.com","list-id":"<tosdr.googlegroups.com>","x-google-group-id":"966240515290","list-post":"<http://groups.google.com/group/tosdr/post>, <mailto:tosdr@googlegroups.com>","list-help":"<http://groups.google.com/support/>, <mailto:tosdr+help@googlegroups.com>","list-archive":"<http://groups.google.com/group/tosdr>","sender":"tosdr@googlegroups.com","list-subscribe":"<http://groups.google.com/group/tosdr/subscribe>, <mailto:tosdr+subscribe@googlegroups.com>","list-unsubscribe":"<http://groups.google.com/group/tosdr/subscribe>, <mailto:googlegroups-manage+966240515290+unsubscribe@googlegroups.com>","content-type":"text/plain; charset=UTF-8","content-transfer-encoding":"quoted-printable"},"subject":"Gittip: [Good] All materials and content in the public domain","messageId":"b6cdbb17-a894-43b8-aeca-c96b4680331f@googlegroups.com","priority":"normal","from":[{"address":"colindean@gmail.com","name":""}],"replyTo":[{"address":"tosdr@googlegroups.com","name":""}],"to":[{"address":"tosdr@googlegroups.com","name":""}],"date":"2014-01-23T01:33:09.000Z"}