<template>
  <vue-final-modal
    v-slot="{ close }"
    v-model="showModalPC"
    v-bind="$attrs"
    name="modal-pc"
    lock-scroll="false"
    classes="flex justify-center items-center"
    content-class="xs:max-w-[23rem] md:max-w-[46rem] lg:max-w-7xl w-full relative xs:max-h-[640px] h-full flex !flex-col bg-white custom-modal-pc"
  >
    <div
      class="bg-red-500 xs:py-3 flex justify-between items-center lg:pt-[2px] lg:pb-[2px] pl-3 pr-16"
    >
      <button
        class="absolute right-0 !mb-0 outline-none bg-transparent border-0"
        @click="close"
      >
        <i class="fa fa-times text-white text-xl" aria-hidden="true"></i>
      </button>
      <span class="xs:hidden md:block md:text-xl text-white">Chọn linh kiện</span>
      <input
        type="text"
        placeholder="Bạn cần tìm linh kiện gì?"
        class="custom-modal-pc-search w-full outline-none overflow-hidden rounded-md p-2"
        v-model="searchText"
      />
    </div>

    <div class="flex justify-between h-full">
      <div
        class="xs:hidden md:block md:max-w-[275px] lg:max-w-[400px] w-full bg-gray-200 p-2"
      >
        <div
          class="border border-solid border-gray-400 p-3 font-semibold text-center uppercase mb-4"
        >
          lọc sản phẩm theo
        </div>

        <div class="overflow-y-auto md:max-h-[465px] lg:max-h-[473px] h-full">
          <div
            class="border-b-solid mb-3"
            v-for="filter in filterLists"
            :key="filter?.key"
          >
            <h4 class="font-semibold">{{ filter?.name }}</h4>
            <ul class="flex flex-wrap justify-between items-center">
              <li class="w-1/2 mb-2" v-for="(item, index) in filter?.items" :key="index">
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :data-id="item?.key"
                    class="w-4 h-4 !mb-0 flex-shrink-0"
                    :value="item?.key"
                    v-model="company"
                  />
                  <span class="ml-2 leading-5">{{ item?.name }}</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div
          class="bg-gray-100 py-3 px-4 flex xs:flex-col md:flex-row items-center justify-between"
        >
          <div class="flex items-center custom-modal-pc-right-top">
            <span class="w-[110px]"> Sắp xếp </span>
            <select
              v-model="sortBy"
              class="ml-2 border !mb-0 border-black p-1 outline-none overflow-hidden rounded"
            >
              <option value="asc">Mới nhất</option>
              <option value="desc">Giá cao</option>
              <option value="asc">Giá thấp</option>
            </select>
          </div>

          <!-- Pagination -->
          <ul class="flex mb-0 xs:mt-3 md:mt-0 custom-modal-pc-right-paginate">
            <li class="!mb-0">
              <button
                @click="handlePrevPage()"
                class="w-8 h-8 !p-0 !mb-0 !mr-0 text-center ml-2 border-0 bg-gray-200 rounded outline-none"
              >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
              </button>
            </li>
            <li class="!mb-0" v-for="(page, index) in totalPages" :key="index">
              <button
                @click="getDataPaginate(page)"
                class="w-8 h-8 !p-0 !mb-0 !mr-0 text-center ml-2 bg-gray-200 rounded outline-none"
                :class="{ 'border bg-[#F24C4C]': page === currentPage }"
              >
                {{ page }}
              </button>
            </li>
            <li class="!mb-0">
              <button
                @click="handleNextPage()"
                class="w-8 h-8 !p-0 !mb-0 !mr-0 text-center ml-2 border-0 bg-gray-200 rounded outline-none"
              >
                <i class="fa fa-angle-right" aria-hidden="true"></i>
              </button>
            </li>
          </ul>
        </div>

        <div
          class="overflow-y-auto md:max-h-[490px] lg:max-h-[485px] h-full custom-modal-pc-right"
        >
          <div
            v-for="product in filteredProduct"
            :key="product.id"
            class="flex xs:flex-col lg:flex-row justify-between p-5 border-b last:border-b-0"
          >
            <div class="flex">
              <img
                :src="product.image || 'https://via.placeholder.com/260'"
                :alt="product.name"
                class="w-[140px] h-[125px] object-cover"
              />
              <div class="xs:max-w-[10rem] md:max-w-[15rem] lg:max-w-[28rem] ml-5">
                <p class="font-semibold leading-4 mb-1 break-words">
                  {{ product.name }}
                </p>
                <p class="mb-1 leading-4">
                  <span class="font-semibold">Mã SP: {{ product.id }}</span>
                </p>
                <p class="mb-1 leading-4">
                  <span class="font-semibold">Bảo hành:</span>
                  {{ product.guarantee || '0 tháng' }}
                </p>
                <p class="mb-1 leading-4">
                  <span class="font-semibold">Kho hàng:</span> Liên hệ
                </p>
                <p class="text-red-500 font-bold text-xl">
                  {{
                    new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(product.price) || 0
                  }}
                </p>
              </div>
            </div>
            <button
              class="flex xs:mt-4 lg:mt-0 items-center justify-center leading-3 py-1 px-3 h-9 rounded uppercase bg-blue-500 text-white text-[13px] font-semibold"
              @click="addProduct(product)"
            >
              Thêm vào cấu hình
              <i class="fa fa-plus ml-2" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
//import difference from 'lodash/difference';
import { priceRanges } from '../mocks/priceRanges';

export default {
  name: 'ModalPC',
  props: ['partID'],
  computed: {
    filteredProduct() {
      if (!this.filterLists) return this.productList;

      return this.productList
        ?.filter((product) => {
          return (
            this.searchText.length === 0 ||
            product.name.toLowerCase().includes(this.searchText)
          );
        })
        .sort((a, b) => {
          if (this.sortBy === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        })
        .slice(this.startIndex, this.endIndex);
    },
    // filterList() {
    //   if (!this.filterItem) {
    //     return this.filterLists;
    //   } else {
    //     const res = this.filterLists.map((el) => {
    //       return {
    //         ...el,
    //         items: this.checkDuplicate(el.items).length
    //           ? this.checkDuplicate(el.items)
    //           : el.items,
    //       };
    //     });
    //     return res;
    //   }
    // },
    totalPages() {
      return Math.ceil(this.productList?.length / 10);
    },
  },
  data() {
    return {
      company: [],
      searchText: '',
      sortBy: 'asc',
      showModalPC: false,
      detailPart: null,
      productList: [],
      filterLists: [],
      currentPage: 1,
      startIndex: 0,
      endIndex: 10,
      quantity: 1,
      priceRanges,
      filterItem: '',
    };
  },
  watch: {
    showModalPC(newValue, oldValue) {
      if (oldValue) {
        this.company = [];
        this.searchText = '';
        this.sortBy = 'asc';
        this.startIndex = 0;
        this.endIndex = 10;
        this.currentPage = 1;
        this.filteredProduct = [];
        this.quantity = 1;
        this.productList = [];
        //this.filterLists = [];
      }
    },
    partID(newVal, oldVal) {
      if (newVal !== oldVal) {
        fetch(`https://mscshop.vn/wp-json/wp/v3/all-taxonomy?category=${this.partID}`, {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((data) => {
            this.detailPart = data;
            this.productList = data.products;
            this.filterLists = data.filter;
          });
      }
    },
    // eslint-disable-next-line no-unused-vars
    company(newVal, oldVal) {
      this.filterItem = newVal[0];

      // call api filter product
      const filterList = [...newVal];
      if (newVal.length > 0) {
        fetch(
          `https://mscshop.vn/wp-json/wp/v3/filter-product?categories=${this.partID},${filterList.join(",")}`,
          {
            method: 'GET',
          }
        )
          .then((res) => res.json())
          .then((data) => {
            this.productList = data?.products;
            this.filterLists = data?.filters;
          });
      } else {
        fetch(
          `https://mscshop.vn/wp-json/wp/v3/filter-product?categories=${this.partID}`,
          {
            method: 'GET',
          }
        )
          .then((res) => res.json())
          .then((data) => {
            this.productList = data?.products;
            this.filterLists = data?.filters;
          });
      }
    },
  },
  methods: {
    checkDuplicate(arr) {
      return arr.reduce(
        (acc, cur) => (this.company.includes(cur.key) ? [...acc, cur] : acc),
        []
      );
    },
    addProduct(product) {
      this.$emit('add-product', { ...product, quantity: this.quantity });
      this.showModalPC = false;
    },
    getDataPaginate(page) {
      this.currentPage = page;
      this.startIndex = page * 10 - 10;
      this.endIndex = page * 10;
    },
    handlePrevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
      this.getDataPaginate(this.currentPage);
    },
    handleNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
      this.getDataPaginate(this.currentPage);
    },
    activePaginate(page) {
      if (page === this.currentPage) {
        return 'border border-b-gray-300';
      } else {
        return '';
      }
    },
  },
};
</script>
