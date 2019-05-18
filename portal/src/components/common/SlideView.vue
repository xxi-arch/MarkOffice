<template>
<transition name="slide-fade" v-on:after-enter="afterEnter">
    <el-card :style="{ 'z-index': zIndex }" ref="slide" id="slide" class="slide-detail-card-container d-view" :body-style="bodyStyle">
        <slot></slot>
    </el-card>
</transition>
</template>

<script>
// import { getMaxIndex } from '@/utils/index'

import {
    PopupManager
} from 'element-ui/lib/utils/popup'

export default {
    name: 'slide-view',
    components: {},
    computed: {},
    watch: {},
    data() {
        return {
            zIndex: PopupManager.nextZIndex()
        }
    },
    props: {
        bodyStyle: {
            type: Object,
            default: () => {
                return {
                    padding: 0
                }
            }
        },
        /** 监听点击事件 隐藏视图 */
        listenerIDs: {
            type: Array,
            default: () => {
                return []
            }
        },
        /** 阻挡点击事件 隐藏视图 */
        noListenerIDs: {
            type: Array,
            default: () => {
                return []
            }
        },
        noListenerClass: {
            type: Array,
            default: () => {
                return []
            }
        },
        appendToBody: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if (this.appendToBody) {
            document.body.appendChild(this.$el)
        }
        this.listenerIDs.forEach(element => {
            if (document.getElementById(element)) {
                document
                    .getElementById(element)
                    .addEventListener('click', this.handleDocumentClick, false)
            }
        })
    },
    methods: {
        handleDocumentClick(e) {
            var hidden = true
            // console.log(e)
            this.noListenerIDs.forEach(element => {
                if (
                    document.getElementById(element) &&
                    document.getElementById(element).contains(e.target)
                ) {
                    hidden = false
                }
            })

            this.noListenerClass.forEach(element => {
                var items = document.getElementsByClassName(element)
                if (items && hidden) {
                    for (let index = 0; index < items.length; index++) {
                        const element = items[index]
                        if (element.contains(e.target)) {
                            hidden = false
                            break
                        }
                    }
                }
            })

            if (
                document.getElementById('slide') &&
                document.getElementById('slide').contains(e.target)
            ) {
                hidden = false
            }
            if (hidden) {
                this.$emit('side-close')
            }
        },
        afterEnter() {
            this.$emit('afterEnter')
        }
    },

    beforeDestroy() {
        if (this.appendToBody && this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
    }
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    will-change: transform;
    transition: all 0.35s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
    transform: translateX(100%);
}

.d-view {
    position: fixed;
    width: 926px;
    top: 0px;
    bottom: 0;
    right: 0;
    overflow: scroll;
    overflow-x: hidden;
}

.d-view::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 7px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.d-view::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
}

.d-view::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #EDEDED;
}
</style>
