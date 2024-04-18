<template>
    <section id="section">
        <div class="app_width">
            <header id="main_header">
                <div class="logo-2">
                    <ScanLogo />
                </div>

                <div class="tabs" ref="menu"
                    :style="$route.name == 'scan' ? { width: '100%', justifyContent: 'space-between' } : {}">
                    <div class="logo">
                        <ScanLogo />
                    </div>

                    <div class="items">
                        <RouterLink to="/">
                            <div class="tab_item">
                                <p>Home</p>
                            </div>
                        </RouterLink>
                        <a target="_blank" href="https://metreon.gitbook.io/metreon-docs/">
                            <div :class="'tab_item'">
                                <p>Docs</p>
                            </div>
                        </a>
                        <a target="_blank" href="https://bridge.metreon.xyz">
                            <div :class="'tab_item'">
                                <p>Beamre Bridge</p>
                                <OutIcon />
                            </div>
                        </a>
                    </div>

                    <div class="connection" style="width: 190px;" v-if="$route.name == 'scan'">
                        <div class="theme">
                            <SunIcon />
                        </div>
                    </div>
                </div>
                <div class="connection" v-if="$route.name == 'scan-detail'">
                    <div class="search">
                        <input type="text" v-model="search" placeholder="Search by Msg Id or Transaction hash">
                        <div @click="goSearch" class="search_action">
                            <SearchIcon />
                        </div>
                    </div>

                    <div class="theme">
                        <SunIcon />
                    </div>
                </div>
                <div class="handburger">
                    <div ref="handburger" id="handburger" v-on:click="onDrawer()">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </header>
        </div>
    </section>
</template>

<script setup>
import ScanLogo from '../components/icons/ScanLogo.vue';
import SearchIcon from '../components/icons/SearchIcon.vue';
import SunIcon from '../components/icons/SunIcon.vue';
import OutIcon from './icons/OutIcon.vue';
</script>

<script>
import { notify } from '../reactives/notify';
export default {
    data() {
        return {
            search: ''
        };
    },
    methods: {
        onDrawer() {
            this.$refs["handburger"].classList.toggle("open");
            this.$refs["menu"].classList.toggle("open-menu");
            document.body.classList.toggle("modal");
        },
        determineGlass() {
            const header = document.getElementById('main_header');
            header.classList.toggle('glass', window.scrollY > 850);
        },
        goSearch: function () {
            if (this.search == '') {
                notify.push({
                    title: 'Enter Msg Id or Txn Hash',
                    description: 'Field is required!',
                    category: 'error'
                });
                return;
            }

            this.$router.go(`/${this.search}`);
            this.search = '';
        }
    },
    mounted() {
        document.querySelectorAll('.items a').forEach(element => {
            element.addEventListener('click', () => {
                context.onDrawer();
            });
        });
        this.determineGlass();
        const context = this;
        window.addEventListener('scroll', function () {
            context.determineGlass();
        });
    }
};
</script>

<style scoped>
section {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
}

header {
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.logo {
    width: 190px;
}

.connection {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: flex-end;
}


.search {
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid var(--bg-lightest, #0C1A33);
    background: var(--bg-dark, #04080D);
    overflow: hidden;
}

.search input {
    background: none;
    border: none;
    width: 320px;
    height: 40px;
    padding: 0 16px;
    align-items: center;
    flex-shrink: 0;
    outline: none;
    color: var(--tx-normal);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.search_action {
    background: var(--bg-lightest, #B1CC8F);
    height: 40px;
    width: 40px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo svg {
    height: 34px;
}

.tabs {
    gap: 60px;
    display: flex;
    align-items: center;
}

.items {
    display: flex;
    gap: 60px;
}

.tab_item p {
    color: var(--text-dimmed, #6C6E73);
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    padding: 4px 0;
    line-height: 16px;
}

.tab_item_active p {
    color: var(--text-normal, #EEF1F8);
}


a .tab_item {
    display: flex;
    align-items: center;
    gap: 12px;
}

a .tab_item svg {
    margin-top: 2px;
}

.theme {
    border-radius: 4px;
    background: var(--background-lighter, #091121);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
}

.handburger {
    display: none;
    cursor: pointer;
}

.glass #handburger span {
    background: #0C1A33;
}

.logo-2 {
    display: none;
}

@media screen and (max-width: 1000px) {
    .search {
        display: none;
    }

    .logo {
        display: none;
    }

    .logo-2 {
        display: block;
    }

    .logo svg {
        height: 26px;
    }

    .tabs {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        top: 0;
        right: -120%;
        flex-direction: column;
        align-items: flex-start;
        background: var(--bg);
        padding: 60px 20px;
        gap: 0;
    }

    .items {
        width: 100%;
        flex-direction: column;
        gap: 0;
    }

    .theme {
        display: none;
    }

    .open-menu {
        right: 0 !important;
    }

    .connection_action {
        width: 150px;
    }

    a {
        display: block;
        width: 100%;
    }

    a .tab_item {
        width: 100%;
        height: 65px;
        border-bottom: 1px solid var(--bg-lightest);
        padding: 0 20px;
    }

    .handburger {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 2px;
        width: 40px;
        height: 40px;
        z-index: 9999;
    }

    #handburger {
        width: 24px;
        height: 14px;
        position: relative;
        transform: rotate(0deg);
        transition: 0.5s ease-in-out;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #handburger span {
        display: block;
        position: absolute;
        height: 2px;
        width: 24px;
        background: #FFFFFF;
        opacity: 1;
        left: 0;
        transform: rotate(0deg);
        transition: 0.25s ease-in-out;
    }

    #handburger span:nth-child(1) {
        top: 0px;
    }

    #handburger span:nth-child(2),
    #handburger span:nth-child(3) {
        top: 6px;
    }

    #handburger span:nth-child(4) {
        top: 12px;
    }


    #handburger.open span:nth-child(1) {
        top: 10px;
        width: 0%;
        left: 50%;
    }

    #handburger.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    #handburger.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    #handburger.open span:nth-child(4) {
        top: 18px;
        width: 0%;
        left: 50%;
    }
}
</style>