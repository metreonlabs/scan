<template>
    <section id="section">
        <div class="app_width">
            <div class="explore">
                <div class="explore_title">
                    <h3>Explore Metreon Messages</h3>
                    <p>Track all cross-chain messages passed by Metreon across Areon, Polygon, BNB Chain, and
                        more.</p>
                </div>

                <div class="explore_stat">
                    <div class="explore_stat_title">
                        <p>Latest Messages</p>
                        <p>Latest {{ total < 10 ? total : '10' }} out of <span>{{ total }}</span></p>
                    </div>

                    <div class="search">
                        <input type="text" v-model="search" placeholder="Search by Msg Id or Transaction hash">
                        <div @click="goSearch" class="search_action">
                            <SearchIcon />
                        </div>
                    </div>
                </div>

                <LoadingBox v-if="loading" />

                <div class="explore_table" v-else>
                    <table>
                        <div class="thead">
                            <thead>
                                <tr>
                                    <td>Msg Id</td>
                                    <td>Status</td>
                                    <td>Created</td>
                                    <td>Source Txn Hash</td>
                                    <td>Destination Txn Hash</td>
                                </tr>
                            </thead>
                        </div>
                        <RouterLink :to="`/${event.messageId}`" v-for="event, i in events" :key="i">
                            <div class="tbody">
                                <tbody>
                                    <tr>
                                        <td>
                                            <p class="event_id">{{ fineId(event.messageId) }}</p>
                                        </td>
                                        <td>
                                            <div class="event_status" v-if="event.status == 0">
                                                <OngoingIcon />
                                                <p>Pending</p>
                                            </div>
                                            <div class="event_status" v-if="event.status == 1">
                                                <OngoingIcon />
                                                <p>Processing</p>
                                            </div>
                                            <div class="event_status" v-if="event.status == 2">
                                                <SuccessfulIcon />
                                                <p>Successful</p>
                                            </div>
                                            <div class="event_status" v-if="event.status == 3">
                                                <FailedfulIcon />
                                                <p>Failed</p>
                                            </div>
                                            <div class="event_status" v-if="event.status == 4">
                                                <FailedfulIcon />
                                                <p>Will Retry</p>
                                            </div>
                                            <div class="event_status" v-if="event.status == 5">
                                                <OngoingIcon />
                                                <p>Retrying</p>
                                            </div>
                                        </td>
                                        <td>
                                            <p class="event_time">{{ format(event.initializedTimestamp * 1000) }}</p>
                                        </td>
                                        <td>
                                            <div class="event_hash">
                                                <div class="event_hash_image">
                                                    <img :src="$chain(event.fromChainId).image" alt="">
                                                </div>
                                                <a v-if="event.fromTrxHash"
                                                    :href="`${$chain(event.fromChainId).scan}/tx/${event.fromTrxHash}`">
                                                    <p>{{ fineHash(event.fromTrxHash) }}</p>
                                                </a>
                                                <p v-else>--------</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="event_hash">
                                                <a v-if="event.toTrxHash"
                                                    :href="`${$chain(event.toChainId).scan}/tx/${event.toTrxHash}`">
                                                    <p>{{ fineHash(event.toTrxHash) }}</p>
                                                </a>
                                                <p v-else>--------</p>

                                                <div class="event_hash_image">
                                                    <img :src="$chain(event.toChainId).image" alt="">
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </div>
                        </RouterLink>
                    </table>
                </div>


            </div>
        </div>
    </section>
</template>

<script setup>
import LoadingBox from '../components/LoadingBox.vue';
import SearchIcon from '../components/icons/SearchIcon.vue';
import OngoingIcon from '../components/icons/OngoingIcon.vue';
import FailedfulIcon from '../components/icons/FailedfulIcon.vue';
import SuccessfulIcon from '../components/icons/SuccessfulIcon.vue';
</script>

<script>
import { fetchTransactions, fineHash, fineId } from '../scripts/scan';
import { notify } from '../reactives/notify';
import { format } from 'timeago.js';
export default {

    watch: {
        '$store.state.network': function () {
            console.log(this.network);
            this.getEvents();
        }
    },
    data() {
        return {
            search: '',
            loading: false,
            events: [],
            total: 0
        };
    },
    mounted() {
        this.getEvents();
    },
    methods: {
        format: format,
        fineId: fineId,
        fineHash: fineHash,
        getEvents: async function () {
            this.loading = true;
            const response = await fetchTransactions(this.$store.state.network);
            this.events = response.data;
            this.total = response.total;
            this.loading = false;
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

            this.$router.push(`/${this.search}`);
            this.search = '';
        }
    }
};
</script>

<style scoped>
.explore {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 170px;
    padding-bottom: 50px;
}

.explore_title {
    text-align: center;
    width: 560px;
    max-width: 100%;
}

.explore_title h3 {
    color: var(--tx-normal, #EEF1F8);

    font-size: 34px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    /* 40.8px */
    letter-spacing: 0.68px;
}

.explore_title p {
    margin-top: 26px;
    color: var(--tx-semi, #8B909E);
    text-align: center;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%;
    /* 25.6px */
}

.explore_stat {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 1240px;
    max-width: 100%;
    margin-top: 120px;
}

.explore_stat_title p:first-child {
    color: var(--tx-normal, #EEF1F8);

    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    /* 24px */
    letter-spacing: 0.4px;
}

.explore_stat_title p:last-child {
    margin-top: 8px;
    color: var(--tx-dimmed, #5C5E66);

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    /* 16.8px */
}

.explore_stat_title p:last-child span {
    color: var(--pr-dimmed, #C0B477);
}


.search {
    display: flex;
    align-items: center;
    border-radius: 4px;
    border: 1px solid var(--bg-lightest, #0C1A33);
    background: var(--bg-dark, #04080D);
    overflow: hidden;
    max-width: 100%;
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

.explore_table {
    max-width: 100%;
    overflow-x: auto;
    margin-top: 30px;
    border-radius: 15px;
    border: 2px solid var(--background-lighter, #091121);
    background: var(--background-dark, #04080D);
}

.thead {
    height: 70px;
    padding: 0 26px;
    display: flex;
    align-items: center;
}

td:first-child {
    width: 214px;
}

td:nth-child(2) {
    width: 214px;
}

td:nth-child(3) {
    width: 178px;
}

td:nth-child(4) {
    width: 300px;
}

td:nth-child(5) {
    width: 300px;
    text-align: right;
}

table {
    min-width: 1000px;
}

thead td {
    color: var(--tx-semi, #8B909E);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.tbody {
    display: flex;
    align-items: center;
    height: 86px;
    background: var(--bg-light, #050C17);
    margin-bottom: 3px;
    padding: 0 26px;
}

.tbody:hover {
    background: var(--bg-lighter, #091121);
}

.tbody:last-child {
    margin-bottom: 0;
}

.event_hash {
    display: flex;
    align-items: center;
    gap: 10px;
}

.event_id {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.event_status {
    display: flex;
    align-items: center;
    gap: 10px;
}

.event_status p {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.event_time {
    color: var(--tx-normal, #EEF1F8);
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

.event_hash_image {
    padding: 4px;
    border-radius: 4px;
    background: var(--bg-lightest, #0C1A33);
    display: flex;
    align-items: center;
    justify-content: center;
}

.event_hash img {
    width: 14px;
    height: 14px;
    border-radius: 7px;
}

.event_hash p {
    color: var(--tx-semi, #8B909E);
    /* font-family: Matter; */
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    /* 14px */
    letter-spacing: 0.28px;
}

td:nth-child(5) .event_hash {
    justify-content: flex-end;
}

@media screen and (max-width:1000px) {
    .explore_title h3 {
        font-size: 26px;
    }

    .explore_title p {
        font-size: 14px;
        padding: 0 10px;
    }

    .explore_stat {
        flex-direction: column;
        margin-top: 80px;
        gap: 20px;
    }

    .explore_stat_title {
        width: 100%;
        text-align: center;
    }

    .explore_stat_title p:first-child {
        font-size: 16px;
    }

    .explore_stat_title p:last-child {
        margin-top: 6px;
        font-size: 14px;
    }

    .thead {
        height: 60px;
    }

    .tbody {
        height: 70px;
    }
}
</style>