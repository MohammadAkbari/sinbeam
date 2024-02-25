
<script setup lang="ts">
import { ref } from 'vue';


const section0 = ref(null)
const section1 = ref(null)
const section2 = ref(null)
const section3 = ref(null)
const section4 = ref(null)




const goSection = (sectionRef) => {
    var top = sectionRef.offsetTop - 75;
    window.scrollTo(0, top);
}

</script>

<template>
    <div class="row sticky-top">
        <div class="col-12">
            <div class="d-flex justify-content-start" style="height: 72px;">
                <div class="sin-rounded w-100 h-100 d-flex align-items-center px-5 justify-content-between">
                    <div class="d-flex fs-12">
                        <img class="mt-1" style="width: 187px; " src="@/assets/img/Logo-text.png" @click="goSection(section0)" />
                        <div class="d-flex  align-items-center px-5 justify-content-start">
                            <div class="fs-18 fw-500 mx-5" style="opacity: 87%;" @click="goSection(section1)">
                                What Is SinDesigner?
                            </div>
                            <div class="fs-18 fw-500 mx-5" style="opacity: 87%;" @click="goSection(section2)">
                                Key Features
                            </div>
                            <div class="fs-18 fw-500 mx-5" style="opacity: 87%;" @click="goSection(section3)">
                                Capabilities
                            </div>
                            <div class="fs-18 fw-500 mx-5" style="opacity: 87%;" @click="goSection(section4)">
                                About US
                            </div>
                        </div>
                    </div>
                    <div class="d-flex align-items-center" style="background-color: #F4F4F4; border-radius: 4px;">
                        <router-link class="bg-box-primary py-2 bg-basic sin-rounded justify-content-center"
                            :to="{ name: 'main' }">
                            <i class="fa-solid fa-user mx-2 fs-14"></i><span class="mx-2 fw-500 fs-14">Login / Sign
                                Up</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <hr style="height: 2px; border-radius: 0 0 6px 0; width: 100%;background-color: #F4F4F4; margin-bottom: 0px;">
    </div>
    <section ref="section0"></section>
    <div class="d-flex flex-column" style="height: 760px;  background-color: #FAFAFA;">
        <div class="w-100 py-2 " style="z-index: 99999;">

            <div class="row mt-5">
                <div class="d-flex justify-content-center">
                    <span class="fs-28 fw-600" style="color:#125CCB ;">Sin Designer&nbsp;</span>
                    <span class="fs-28 fw-600" style="opacity: 78%;line-height: 41px;">It is a comprehensive software for
                        structural engineers</span>
                </div>
                <span class="d-flex justify-content-center fs-24 fw-400 mt-3" style="color: #545454;">
                    This software helps them to make accurate calculations, analyze data, for structures
                </span>
                <div class="d-flex justify-content-center">
                    <router-link :to="{ name: 'main' }">
                        <button class="btn px-5 py-3 my-5" style="background-color: #125CCB; color: #FFFFFF;"><span
                                class="fs-20 fw-500">Login to Sin Designer</span></button>
                    </router-link>

                </div>
            </div>
        </div>
        <div class="mx-4">
            <img src="../assets/img/home/home-1.png"
                style="position: absolute;height: 262px;width: 315px;top: 299px;left:35px; border-radius:6px;z-index: 9999;"
                alt="">
            <img src="../assets/img/home/home-2.png"
                style="position: absolute;height: 77px;width: 198px;top: 118px;left:-24px; border-radius:6px;z-index: 999;"
                alt="">
            <img src="../assets/img/home/home-3.png"
                style="position: absolute;height: 40%;width: 65%;top: 379px;left:185px; border-radius:6px;z-index: 999"
                alt="">
            <img src="../assets/img/home/home-5.png"
                style="position: absolute;height: 73px;width: 265px;top: 268px;right:149px; border-radius:6px;z-index: 999"
                alt="">
            <img src="../assets/img/home/home-6.png"
                style="position: absolute;height: 262px;width: 315px;top: 472px;right:0px; border-radius:6px;z-index: 999"
                alt="">

            <img src="../assets/img/home/back-1.png" style="position: absolute; top: 13px;right:5px; border-radius:6px;"
                alt="">
            <img src="../assets/img/home/back-2.png" style="position: absolute; top: 270px;left:-23px; border-radius:6px"
                alt="">
        </div>
    </div>
    <div style="max-width: 1440px; margin: 0 auto;">
        <div class="d-flex justify-content-center my-5 py-4">
            <div>
                <img src="../assets/img/home/home-7.png" alt="">
            </div>
            <div class="my-5" style="width: 589px;">
                <h2 class="fs-24 fw-600 px-5" style="color: #125CCB;">Title here </h2>
                <div style="background-color: #F4F4F4;">
                    <p class="fs-18 fw-400 p-5" style="width: 428px;">
                        or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                        amet,
                        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit amet, consectetur adipiscing
                        elit,
                        sed do eiusmod tempor or sit amet, consectetur adipiscing
                    </p>
                </div>

            </div>
        </div>
        <section ref="section1">
            <h3 class="fs-28 fw-500 px-3" style="opacity: 87%;">Who is
                <span class="fs-28 fw-600" style="color: #125CCB;">Sin Designer</span>
                suitable for?
            </h3>
            <div class="d-flex justify-content-center my-5">
                <div class="box-1">
                    <h3 class="fs-24 fw-600">Lorem ipsum </h3>
                    <p class="py-4 fs-18 fw-500">
                        <i class="fa-solid fa-circle fs-10" style="margin-right: 4px; color: #0043a7;"></i>
                        Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor amet, adipiscing sed do
                        eiusmod tempor amet, adipiscing eiusmod tempor amet.
                    </p>
                </div>
                <div class="box-1 box-1-center">
                    <h3 class="fs-24 fw-600">Lorem ipsum </h3>
                    <p class="py-4 fs-18 fw-500">
                        <i class="fa-solid fa-circle fs-10" style="margin-right: 4px; color: #ffffff;"></i>
                        Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor amet, adipiscing sed do
                        eiusmod tempor amet, adipiscing eiusmod tempor amet.
                    </p>
                </div>
                <div class="box-1">
                    <h3 class="fs-24 fw-600">Lorem ipsum </h3>
                    <p class="py-4 fs-18 fw-500">
                        <i class="fa-solid fa-circle fs-10" style="margin-right: 4px; color: #0043a7;"></i>
                        Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor amet, adipiscing sed do
                        eiusmod tempor amet, adipiscing eiusmod tempor amet.
                    </p>
                </div>
            </div>
        </section>
        <div>
            <section ref="section2"></section>
            <h3 class="fs-28 fw-500 px-3" style="opacity: 87%;">Know more our
                <span class="fs-28 fw-600" style="color: #125CCB;">key features</span>
            </h3>
            <div class="d-flex justify-content-center my-5 py-4">
                <div>
                    <img src="../assets/img/home/home-8.png" alt="">
                </div>
                <div class="my-5" style="width: 800px;">
                    <div style="background-color: #F4F4F4;">
                        <h2 class="fs-20 fw-500 px-5 pt-5"><span class="fs-20 fw-500" style="color: #125CCB;">Lorem
                                ipsum</span> is placeholder text commonly </h2>

                        <ul class="py-4 list-unstyled">
                            <li class="px-5 fw-400 fs-18 pt-4">
                                <i class="fa-solid fa-circle-check fs-18"
                                    style="color: #69C179; margin-right: 5px; opacity: 87%;"></i>
                                Lorem ipsum dolor sit amet, adipiscing elitg ipsum dolor sit.
                            </li>
                            <li class="px-5 fw-400 fs-18 pt-4">
                                <i class="fa-solid fa-circle-check fs-18"
                                    style="color: #69C179; margin-right: 5px; opacity: 87%;"></i>
                                sed do eiusmod tempor amet, adipiscing amet, adipiscing.
                            </li>
                            <li class="px-5 fw-400 fs-18 pt-4">
                                <i class="fa-solid fa-circle-check fs-18"
                                    style="color: #69C179; margin-right: 5px; opacity: 87%;"></i>
                                amet, adipiscing elit, sed do.
                            </li>
                            <li class="px-5 fw-400 fs-18 pt-4">
                                <i class="fa-solid fa-circle-check fs-18"
                                    style="color: #69C179; margin-right: 5px; opacity: 87%;"></i>
                                Lorem ipsum dolor sit amet, adipiscing elitg sit amet.
                            </li>
                            <li class="px-5 fw-400 fs-18 pt-4">
                                <i class="fa-solid fa-circle-check fs-18"
                                    style="color: #69C179; margin-right: 5px; opacity: 87%;"></i>
                                Lorem ipsum dolor sit amet, adipiscing elitg.
                            </li>
                            <li class="px-5 fw-400 fs-18 pt-4">
                                <i class="fa-solid fa-circle-check fs-18"
                                    style="color: #69C179; margin-right: 5px; opacity: 87%;"></i>
                                Lorem ipsum dolor sit amet, adipiscing elitg ipsum dolor.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center my-5 py-4">
                <div>
                    <img src="../assets/img/home/home-9.png" alt="">
                </div>
                <div style="width: 750px;">
                    <div class="px-3 my-4 py-4 rounded" style="background-color: #F4F4F4;">
                        <p class="fs-18 fw-400 mx-2" style="margin-right: 60px;">
                            <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #0043a7;"></i>
                            <span class="fs-18 fw-500">Lorem ipsum</span> dolor sit amet, consectetur sfsfdf adipiscing
                            elit, sed do eiusmod tempor sed do sit
                            amet, consectetur sfsfdf adipiscing elit, sed do eiusmod tempor sed do sit amet, consectetur
                            sfsfdf adipiscing.
                        </p>
                    </div>
                    <div class="px-3 my-4 py-4 rounded" style="background-color: #F4F4F4;">
                        <p class="fs-18 fw-400 px-2" style="margin-right: 60px;">
                            <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #0043a7;"></i>
                            <span class="fs-18 fw-500">Lorem ipsum</span> dolor sit amet, consectetur sfsfdf adipiscing
                            elit, sed do eiusmod tempor sed do sit
                            amet, consectetur sfsfdf adipiscing elit, sed do eiusmod tempor sed do sit amet, consectetur
                            sfsfdf adipiscing.
                        </p>
                    </div>
                    <div class="px-3 my-4 py-4 rounded" style="background-color: #F4F4F4;">
                        <p class="fs-18 fw-400 mx-2" style="margin-right: 60px;">
                            <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #0043a7;"></i>
                            <span class="fs-18 fw-500">Lorem ipsum</span> dolor sit amet, consectetur sfsfdf adipiscing
                            elit, sed do eiusmod tempor sed do sit
                            amet, consectetur sfsfdf adipiscing elit, sed do eiusmod tempor sed do sit amet, consectetur
                            sfsfdf adipiscing.
                        </p>
                    </div>
                </div>
            </div>
            <div class="box-2">
                <div class="d-flex justify-content-center my-5">
                    <div class="mx-2 flex-fill" style="width: 369px; height: 318px;">
                        <img style="width: 100%; height: 100%;" src="../assets/img/home/home-1.png" alt="">
                    </div>
                    <div class="mx-2 flex-fill rounded" style="width: 340px;">
                        <div class="px-4 py-5" style="background-color: #F4F4F4;">
                            <h2 class="fs-20 fw-500 pb-3" style="color: #0d54bf;">Lorem ipsum</h2>
                            <p class="fs-18 fw-400 px-2" style="margin-right: 60px;">
                                <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #69C179;"></i>
                                Lorem ipsum dolor sit amet sed do dolor sit amet.
                            </p>
                            <p class="fs-18 fw-400 px-2" style="margin-right: 60px;">
                                <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #69C179;"></i>
                                Lorem ipsum dolor sit amet sed do dolor sit amet.
                            </p>
                        </div>
                        <router-link :to="{ name: 'main' }">
                            <button class="btn px-5 py-3 mt-3"
                                style="background-color: #125CCB; color: #FFFFFF; width: 100%;"><span
                                    class="fs-20 fw-500">Login
                                    to Sin Designer</span></button>
                        </router-link>


                    </div>
                    <div class="mx-2 flex-fill px-4 py-5 mx-2 rounded" style="background-color: #F4F4F4;">
                        <img style="width: 523px; height: 152px; border-radius: 8px;" src="../assets/img/home/home-10.png"
                            alt="">
                        <div class="pt-4 px-3">
                            <h2 class="fs-20 fw-500" style="color: #0d54bf;">Lorem ipsum dolor</h2>
                            <span>
                                <i class="fa-solid fa-circle-check fs-18 py-3"
                                    style="color: #69C179; margin-right: 5px; opacity: 87%;"></i>
                                Lorem ipsum dolor sit amet, adipiscing elitg sit amet.
                            </span>
                        </div>

                    </div>
                </div>
                <h4 class="fs-20 fw-600" style="color:#45A667">Performance difference </h4>
                <h4 class="fs-28 fw-500 mt-4" style="color:#000000;opacity: 87%;">
                    <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #125ccb;"></i>
                    with competitors
                </h4>
                <div class="d-flex justify-content-center my-5">
                    <div class="mx-2 flex-fill">
                        <div class="px-4 py-5" style="background-color: #F4F4F4;border-radius: 8px;">
                            <h2 class="fs-18 fw-600 pb-3 px-4" style="opacity: 87%;"><img
                                    src="../assets/img/home/icon-1.png" alt=""> Reporting</h2>
                            <p class="fs-16 fw-500 px-4" style="opacity: 78%;margin-right: 60px;">
                                or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or
                                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or
                                sit.
                            </p>
                        </div>
                    </div>
                    <div class="mx-2 flex-fill">
                        <div class="px-4 py-5" style="background-color: #F4F4F4; border-radius: 8px;">
                            <h2 class="fs-18 fw-600 pb-3 px-4" style="opacity: 87%;"><img
                                    src="../assets/img/home/icon-1.png" alt=""> Reporting</h2>
                            <p class="fs-16 fw-500 px-4" style="opacity: 78%;margin-right: 60px;">
                                or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or
                                sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or
                                sit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <section ref="section3"></section>
            <div class="d-flex mx-1 py-3">
                <img style="height: 24px;" src="../assets/img/home/icon-2.png" alt="">
                <h3 class="px-3">Capabilities</h3>
            </div>
            <div class="row mx-1 p-4" style="background-color: #ECF3FC;">

                <div class="col-4 py-2">
                    <div class="m-1 p-5" style="background-color: #ffffff;">
                        <h3 class="mb-4" style="color: #212121;">
                            <img style="height: 24px;" src="../assets/img/home/icon-3.png" alt="">
                            General Informations
                        </h3>
                        <p class="fs-16 fw-400 text-justify">
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            fsfs
                            amet, consectetur adipiscing elit, sed do sf eiusmod tempor incididunt ut labore et. or sit df
                            sdf
                            amet, consectetur adipiscing elit, sed do
                        </p>
                    </div>
                </div>
                <div class="col-4 py-2">
                    <div class="m-1 p-5" style="background-color: #ffffff;">
                        <h3 class="mb-4" style="color: #212121;">
                            <img style="height: 24px;" src="../assets/img/home/icon-4.png" alt="">
                            Define Section
                        </h3>
                        <p class="fs-16 fw-400 text-justify">
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            fsfs
                            amet, consectetur adipiscing elit, sed do sf eiusmod tempor incididunt ut labore et. or sit df
                            sdf
                            amet, consectetur adipiscing elit, sed do
                        </p>
                    </div>
                </div>
                <div class="col-4 py-2">
                    <div class="m-1 p-5" style="background-color: #ffffff;">
                        <h3 class="mb-4" style="color: #212121;">
                            <img style="height: 24px;" src="../assets/img/home/icon-5.png" alt="">
                            Loading
                        </h3>
                        <p class="fs-16 fw-400 text-justify">
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            fsfs
                            amet, consectetur adipiscing elit, sed do sf eiusmod tempor incididunt ut labore et. or sit df
                            sdf
                            amet, consectetur adipiscing elit, sed do
                        </p>
                    </div>
                </div>


                <div class="col-4 pt-3">
                    <div class="m-1 p-5" style="background-color: #ffffff;">
                        <h3 class="mb-4" style="color: #212121;">
                            <img style="height: 24px;" src="../assets/img/home/icon-6.png" alt="">
                            Analysis
                        </h3>
                        <p class="fs-16 fw-400 text-justify">
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            fsfs
                            amet, consectetur adipiscing elit, sed do sf eiusmod tempor incididunt ut labore et. or sit df
                            sdf
                            amet, consectetur adipiscing elit, sed do
                        </p>
                    </div>
                </div>
                <div class="col-4 pt-3">
                    <div class="m-1 p-5" style="background-color: #ffffff;">
                        <h3 class="mb-4" style="color: #212121;">
                            <img style="height: 24px;" src="../assets/img/home/icon-7.png" alt="">
                            Verifications
                        </h3>
                        <p class="fs-16 fw-400 text-justify">
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            fsfs
                            amet, consectetur adipiscing elit, sed do sf eiusmod tempor incididunt ut labore et. or sit df
                            sdf
                            amet, consectetur adipiscing elit, sed do
                        </p>
                    </div>
                </div>

                <div class="col-4 pt-3">
                    <div class="m-1 p-5" style="background-color: #ffffff;">
                        <h3 class="mb-4" style="color: #212121;">
                            <img style="height: 24px;" src="../assets/img/home/icon-8.png" alt="">
                            Design
                        </h3>
                        <p class="fs-16 fw-400 text-justify">
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            fsfs
                            amet, consectetur adipiscing elit, sed do sf eiusmod tempor incididunt ut labore et. or sit df
                            sdf
                            amet, consectetur adipiscing elit, sed do
                        </p>
                    </div>
                </div>
                <div class="col-12 pt-4">
                    <div class="m-1 p-5" style="background-color: #ffffff;">
                        <h3 class="mb-4" style="color: #212121;">
                            <img style="height: 24px;" src="../assets/img/home/icon-9.png" alt="">
                            Reporting
                        </h3>
                        <p class="fs-16 fw-400 text-justify">
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor or sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et. or sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et. or sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et. or sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                        </p>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center my-5 py-4" style="background-color: #FAFAFA;">
                <div>
                    <img src="../assets/img/home/image-1.png" alt="">
                </div>
                <div class="align-self-center" style="width: 800px;">
                    <h2 class="fs-24 fw-600 px-5 mb-5" style="color: #125CCB;">Title here </h2>
                    <div>
                        <p class="fs-18 fw-400 px-5" style="width: 800px;">
                            or sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit
                            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. or sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor or sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor.
                        </p>
                    </div>
                </div>
            </div>
            <section ref="section4"></section>

            <!-- footer -->
            <div class="footer row d-flex my-2 py-3">
                <div class="col-3 align-self-center">
                    <div class="px-5 my-4 py-4 rounded">
                        <h3 class="fs-18 fw-400  mb-4">
                            <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #3B924B;"></i>
                            About <span class="fs-18 fw-600">Sin Designer</span>
                        </h3>
                        <p class="fs-14 fw-400 px-2">
                            ed do eiusmod tempor incididunt ut labore et. or sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et. or sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et. or sit amet, consectetur adipiscing eli
                        </p>
                    </div>
                </div>
                <div class="col-3">
                    <div class="px-5 my-4 py-4 rounded">
                        <h3 class="fs-18 fw-400 mb-4" style="color: #666666;">
                            <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #3B924B;"></i>
                            Contacts
                        </h3>
                        <p class="d-flex justify-content-left">
                            <img class="px-2" src="../assets/img/home/footer-icon-1.png" alt="">
                            beigigroup@gmail.com
                        </p>
                        <p class="d-flex justify-content-left">
                            <img class="px-2" src="../assets/img/home/footer-icon-2.png" alt="">
                            09014304080
                        </p>
                        <p class="d-flex justify-content-left">
                            <img class="px-2" src="../assets/img/home/footer-icon-3.png" alt="">
                            +989014304080
                        </p>
                        <p class="d-flex justify-content-left">
                            <img class="align-self-center px-2" src="../assets/img/home/footer-icon-4.png" alt="">
                            <span>No. 10, Flan Street, Flan Square, Flan Alley, Tehran </span>
                        </p>
                    </div>
                </div>
                <div class="col-2">
                    <div class="px-5 my-4 py-4 rounded">
                        <h3 class="fs-18 fw-400 mb-4" style="color: #666666;">
                            <i class="fa-solid fa-circle fs-8" style="margin-right: 6px; color: #3B924B;"></i>
                            Social
                        </h3>
                        <p class="d-flex justify-content-left">
                            <img class="px-2" src="../assets/img/home/footer-icon-5.png" alt="">
                            Linkedin
                        </p>
                        <p class="d-flex justify-content-left">
                            <img class="px-2" src="../assets/img/home/footer-icon-6.png" alt="">
                            Instagram
                        </p>
                        <p class="d-flex justify-content-left">
                            <img class="px-2" src="../assets/img/home/footer-icon-7.png" alt="">
                            Facebook
                        </p>
                        <p class="d-flex justify-content-left">
                            <img class="px-2" src="../assets/img/home/footer-icon-8.png" alt="">
                            Twitter
                        </p>
                    </div>
                </div>
                <div class="col-4">
                    <div class="px-5 my-4 py-4 rounded">
                        <h3 class="fs-18 fw-500 mb-4" style="color: #125CCB;">
                            Contact Us
                        </h3>
                        <div class="mb-1 py-2 ">
                            <label for="email" class="form-label mb-1 input-label">E-mail</label>
                            <input type="text" class="form-control fs-16" id="email" placeholder="Beigigroup@gmail.com">
                        </div>
                        <div class="mb-1 py-2 ">
                            <label for="message" class="form-label mb-1 input-label">Message</label>
                            <textarea id="message" class="form-control fs-16" cols="30" rows="3"
                                placeholder="your message"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sticky-top {
    background-color: #FAFAFA;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 9999999;
}

.box-1 {
    width: 824px;
    height: 324px;
    background-color: #fafafa;
    border-radius: 12px;
    padding: 60px 40px;
    margin: 12px;
    background-image: url(../assets/img/home/box-1.png);
    background-repeat: no-repeat;
    background-position: right top;

    h3 {
        color: #0043a7;
    }
}

.box-1-center {
    background-color: #125ccb;
    background-image: url(../assets/img/home/box-2.png);

    h3,
    p {
        color: #ffffff;
    }

}

.box-1 p {
    padding-right: 15px;
}

.box-2 {
    background-image: url(../assets/img/home/back-3.png);
    background-repeat: no-repeat;
    background-position: right top;
}

.footer {
    background-color: #FAFAFA;
    background-image: url(../assets/img/home/footer-back-1.png);
    background-repeat: no-repeat;
    background-position: right top;
}
</style>
