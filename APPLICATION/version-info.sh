REACTBUILDVERSION=$(date +%Y-%m-%d)-$(date +%T) && GITCOMMITHASH=`git rev-parse --short HEAD` && sed -i -- 's/%REACTBUILDVERSION%/'$REACTBUILDVERSION'/g' build/index.html && sed -i -- 's/%GITCOMMITHASH%/'$GITCOMMITHASH'/g' build/index.html && echo React Build Version = $REACTBUILDVERSION && echo Git Commit Hash = $GITCOMMITHASH