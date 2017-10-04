#!/bin/bash
for i in `seq 1 200`;
do
	curl -o "lotto-$i.pdf" http://lotto.sigkill.me/
done

zip -r lotto.zip *.pdf
rm *.pdf
