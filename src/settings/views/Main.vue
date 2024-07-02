<template>
    <el-container style="height: 100vh;">
        <el-aside width="200px">
            <el-menu :default-openeds="['1-1']">
                <el-menu-item index="1-1">导航一</el-menu-item>
                <el-menu-item index="1-2">热键设置</el-menu-item>
                <el-menu-item index="1-3">导航三</el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header>头部</el-header>

            <el-main>
                <el-form :model="form">
                    <el-form-item label="剪切板">
                        <el-input v-model="form.clipboard"></el-input>
                    </el-form-item>
                    <el-form-item label="书架">
                        <el-input v-model="form.abook" type="text"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-main>

            <el-footer>底部</el-footer>
        </el-container>
    </el-container>
</template>

<script setup>
import { ref } from 'vue';
// import { register } from '@tauri-apps/api/globalShortcut';
import { doRegister } from '@/shortcut/global.js';
import { S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ListBucketsCommand, ListObjectsCommand, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const credentials = {
    accessKeyId: "b4167379af24324946fff556179c06bacce6f25a",
    secretAccessKey: "cJqcNUNCE53SBEe8G8B413wWQlwwaScWd0vr+1xA02s="
};

// Create an S3 service client object.
const s3Client = new S3Client({
    // endpoint: "https://axg6ie03ufzi.compat.objectstorage.ap-singapore-1.oraclecloud.com",  //old
    endpoint: "https://axg6ie03ufzi.compat.objectstorage.ap-singapore-1.oci.customer-oci.com",  //new
    credentials: credentials,
    region: "ap-singapore-1",
    signatureVersion: "v4",
    forcePathStyle: true,

});



const form = ref({
    clipboard: 'cmd + shift + v',
    abook: '',
});

async function lsBu(){
    const buckets_data = await s3Client.send(
        new ListBucketsCommand({})
    );
    console.log(buckets_data);
}

async function lsOb(){
    const objects_data = await s3Client.send(
        new ListObjectsCommand({
            Bucket: "bucket-20240518-0025",
        })
    );
    console.log(objects_data);
}

async function putOb(){
    //Upload a file
}

async function getfile(){
    // Generate a presigned URL
    const get_command = new GetObjectCommand({
        Bucket: "bucket-20240518-0025",
        Key: "tmp_on4.xlsx",
    });
    const url = await getSignedUrl(s3Client, get_command, { expiresIn: 3600 });
    console.log(url);
}

async function onSubmit() {
    console.log('submit!');
    await doRegister();
}

async function upload(s3Client) {
    //Upload a file
    const upload_data = await s3Client.send(
        new PutObjectCommand({
            Bucket: "bucket-20240518-0025",
            Key: "node-js.txt",
            Body: "some data"
        })
    );
    console.log(upload_data);
}

// const onSubmit = async () => {
//     await doRegister();
// };
</script>
<script>
export default {
    name: 'Main',
}
</script>