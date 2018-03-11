#!/bin/bash
####################################################
# @file:   build.sh
# @author: _AUTHOR_
# @create: _DATETIME_
# @modify: _DATETIME_
# @brief:  build.sh
####################################################

# build前端文件
. ./fe/build.sh

pluginname="_FILENAME_"
pluginversion="1.0"
outdir="output/$pluginname"
buildtime=`date +%Y%m%d%H%M%S`
tarname="$pluginname-$pluginversion-$buildtime.zip"
src="dist-$buildtime"

function cpfiles()
{
    for i in $@; do
        cp -r dzplugin/$i $outdir
    done
}

################################
rm -rf output
mkdir -p $outdir
################################
cpfiles api conf *.php *.xml class table model template cron

cp -rf fe/dist/* $outdir/fe
################################
cd $outdir
# 删除php文件中的所有注释代码
../../clear_annotation -r -w
mv discuz_plugin__FILENAME_.xml discuz_plugin__FILENAME__SC_UTF8.xml
find . -type d -name ".svn" | xargs rm -rf
find . -name "*.bk" | xargs rm -rf
cd ../; zip -r $tarname $pluginname
cd ../
################################

echo 'build success'
exit 0
