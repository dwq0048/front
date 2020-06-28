<template>
    <div class="pee">
        <div class="grid">
            <div class="grid__item" data-size="1280x853">
                <a href="img/original/1.jpg" class="img-wrap"><img src="@/assets/img/thumbs/1.jpg" alt="img01" />
                    <div class="description description--grid">Assemblage</div>
                </a>
            </div>
            <div class="grid__item" data-size="958x1280">
                <a href="img/original/2.jpg" class="img-wrap"><img src="@/assets/img/thumbs/2.jpg" alt="img02" />
                    <div class="description description--grid">Demesne</div>
                </a>
            </div>
            <div class="grid__item" data-size="837x1280">
                <a href="img/original/3.jpg" class="img-wrap"><img src="@/assets/img/thumbs/3.jpg" alt="img03" />
                    <div class="description description--grid">Felicity</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x961">
                <a href="img/original/4.jpg" class="img-wrap"><img src="@/assets/img/thumbs/4.jpg" alt="img04" />
                    <div class="description description--grid">Propinquity</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x1131">
                <a href="img/original/5.jpg" class="img-wrap"><img src="@/assets/img/thumbs/5.jpg" alt="img05" />
                    <div class="description description--grid">Ephemeral</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x857">
                <a href="img/original/6.jpg" class="img-wrap"><img src="@/assets/img/thumbs/6.jpg" alt="img06" />
                    <div class="description description--grid">Surreptitious</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x1280">
                <a href="img/original/7.jpg" class="img-wrap"><img src="@/assets/img/thumbs/7.jpg" alt="img07" />
                    <div class="description description--grid">Scintilla</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x853">
                <a href="img/original/8.jpg" class="img-wrap"><img src="@/assets/img/thumbs/8.jpg" alt="img08" />
                    <div class="description description--grid">Vestigial</div>
                </a>
            </div>
            <div class="grid__item" data-size="865x1280">
                <a href="img/original/9.jpg" class="img-wrap"><img src="@/assets/img/thumbs/9.jpg" alt="img09" />
                    <div class="description description--grid">Zephyr</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x1280">
                <a href="img/original/10.jpg" class="img-wrap"><img src="@/assets/img/thumbs/10.jpg" alt="img10" />
                    <div class="description description--grid">Desideratum</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x850">
                <a href="img/original/11.jpg" class="img-wrap"><img src="@/assets/img/thumbs/11.jpg" alt="img11" />
                    <div class="description description--grid">Quixotic</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x853">
                <a href="img/original/1.jpg" class="img-wrap"><img src="@/assets/img/thumbs/1.jpg" alt="img01" />
                    <div class="description description--grid">Assemblage</div>
                </a>
            </div>
            <div class="grid__item" data-size="958x1280">
                <a href="img/original/2.jpg" class="img-wrap"><img src="@/assets/img/thumbs/2.jpg" alt="img02" />
                    <div class="description description--grid">Demesne</div>
                </a>
            </div>
            <div class="grid__item" data-size="837x1280">
                <a href="img/original/3.jpg" class="img-wrap"><img src="@/assets/img/thumbs/3.jpg" alt="img03" />
                    <div class="description description--grid">Felicity</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x961">
                <a href="img/original/4.jpg" class="img-wrap"><img src="@/assets/img/thumbs/4.jpg" alt="img04" />
                    <div class="description description--grid">Propinquity</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x1131">
                <a href="img/original/5.jpg" class="img-wrap"><img src="@/assets/img/thumbs/5.jpg" alt="img05" />
                    <div class="description description--grid">Ephemeral</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x857">
                <a href="img/original/6.jpg" class="img-wrap"><img src="@/assets/img/thumbs/6.jpg" alt="img06" />
                    <div class="description description--grid">Surreptitious</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x1280">
                <a href="img/original/7.jpg" class="img-wrap"><img src="@/assets/img/thumbs/7.jpg" alt="img07" />
                    <div class="description description--grid">Scintilla</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x853">
                <a href="img/original/8.jpg" class="img-wrap"><img src="@/assets/img/thumbs/8.jpg" alt="img08" />
                    <div class="description description--grid">Vestigial</div>
                </a>
            </div>
            <div class="grid__item" data-size="865x1280">
                <a href="img/original/9.jpg" class="img-wrap"><img src="@/assets/img/thumbs/9.jpg" alt="img09" />
                    <div class="description description--grid">Zephyr</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x1280">
                <a href="img/original/10.jpg" class="img-wrap"><img src="@/assets/img/thumbs/10.jpg" alt="img10" />
                    <div class="description description--grid">Desideratum</div>
                </a>
            </div>
            <div class="grid__item" data-size="1280x850">
                <a href="img/original/11.jpg" class="img-wrap"><img src="@/assets/img/thumbs/11.jpg" alt="img11" />
                    <div class="description description--grid">Quixotic</div>
                </a>
            </div>
		</div>
	</div>
</template>

<script>
export default {
    name: 'GridPost',
    mounted(){
        let element = this.$el.querySelectorAll('.grid__item');
        let Screen = window.innerWidth;
        let cntWidth = Math.floor(Screen / 300);
        let ElementCnt = element.length;
        let imgWidth = 300;
        let margin = 50;
        let option = [];
        for(let i=0; i<cntWidth; i++){
            option.push({ name: i, height: 0, meta: [] })
        }
        let min = option[0];

        for(let i=0; i<ElementCnt; i++){
            for(let j=0; j<option.length; j++){
                if(min.height > option[j].height){
                    min = option[j];
                }
            }

            if(min.name != 0){
                element[i].style.left = `${ ( min.name * imgWidth ) }px`;
            }

            if(option[min.name].height != 0){
                element[i].style.top = `${ ( option[min.name].height ) }px`;
            }

            option[min.name].height = ( option[min.name].height + element[i].offsetHeight + margin );
            option[min.name].meta.push( i );
        }


    }
}
</script>

<style lang="scss" scoped>
    .pee {
        & {
            position:relative;
        }

        & > .grid {
            & {
                font-size: 0;
                text-align: center;
            }

            & > .grid__item {
                width: 300px;
                display: inline-block;
                vertical-align: top;
                position:absolute;
                left:0;
                top:0;
            }
        }
    }
</style>
