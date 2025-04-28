|||
|---|---|
|ДИСЦИПЛИНА|Фронтенд и бэкенд разработка|
|ИНСТИТУТ|ИПТИП|
|КАФЕДРА|Индустриального программирования|
|ВИД УЧЕБНОГО МАТЕРИАЛА|Методические указания к практическим занятиям|
|ПРЕПОДАВАТЕЛЬ|Астафьев Рустам Уралович|
|СЕМЕСТР|2 семестр, 2024/2025 уч. год|

---

### **Практическое занятие 23-24: Балансировщики нагрузки и средства разворачивания веб-приложений**

Данная тема рассчитана на два практических занятия, поэтому практики 23 и 24 дублируют друг друга

---

## **1. Введение**  
**Теоретическая часть:**  
- Понятие балансировки нагрузки (Load Balancing) и её роль в веб-разработке.  
- Виды балансировщиков:  
  - **Аппаратные** (F5, Citrix ADC).  
  - **Программные** (Nginx, HAProxy, Traefik, Cloudflare).  
- Сценарии использования:  
  - Распределение трафика между серверами.  
  - Отказоустойчивость и масштабирование.  
  - Разделение статики и API (микросервисы).  

---

## **2. Настройка Nginx как балансировщика нагрузки**  
### **2.1. Базовые алгоритмы балансировки**  
- Round Robin (по умолчанию).  
- Least Connections (наименьшие соединения).  
- IP Hash (фиксация клиента за сервером).  

**Практика:**  
1. Запуск 2+ бэкенд-серверов (Node.js/Flask) на разных портах.  
2. Конфигурация Nginx для балансировки:  
   ```nginx
   upstream backend {
       server 127.0.0.1:3000;  # Сервер 1
       server 127.0.0.1:3001;  # Сервер 2
       server 127.0.0.1:3002 backup;  # Резервный сервер
   }

   server {
       listen 80;
       location / {
           proxy_pass http://backend;
       }
   }
   ```  
3. Тестирование через `curl` или Postman.  

### **2.2. Health Checks и отказоустойчивость**  
- Проверка работоспособности серверов:  
  ```nginx
  server 127.0.0.1:3000 max_fails=2 fail_timeout=30s;
  ```  

---

## **3. Альтернативные балансировщики: HAProxy**  
### **3.1. Установка и базовая настройка**  
- Конфигурация HAProxy для балансировки:  
  ```cfg
  frontend http_front
      bind *:80
      default_backend http_back

  backend http_back
      balance roundrobin
      server server1 127.0.0.1:3000 check
      server server2 127.0.0.1:3001 check
  ```  

---

## **4. Оркестрация с Docker и Docker Compose**  
### **4.1. Развертывание стека с балансировкой**  
- Пример `docker-compose.yml` для 3 сервисов:  
  ```yaml
  version: "3.8"
  services:
    backend1:
      image: node:18
      command: node server.js
      ports: ["3000:3000"]

    backend2:
      image: node:18
      command: node server.js
      ports: ["3001:3000"]

    nginx:
      image: nginx
      ports: ["80:80"]
      volumes:
        - ./nginx.conf:/etc/nginx/nginx.conf
  ```   

---

## **5. Введение в Kubernetes**  
### **5.1. Базовые концепции**  
- Поды (Pods), Сервисы (Services), Ingress.  
- Настройка балансировки через `kubectl`:  
  ```yaml
  apiVersion: v1
  kind: Service
  metadata:
    name: backend
  spec:
    selector:
      app: backend
    ports:
      - protocol: TCP
        port: 80
        targetPort: 3000
    type: LoadBalancer
  ```
  
---

## **6. Заключение**  
- **Разбор кейсов:**  
  - Когда выбрать Nginx, а когда — Kubernetes?  
  - Оптимизация для высоконагруженных проектов.
    
- **Дополнительные материалы:**  
  - [Документация Nginx](https://nginx.org/en/docs/)  
  - [HAProxy Tutorials](https://www.haproxy.com/documentation/)  
  - [Kubernetes для начинающих](https://kubernetes.io/ru/docs/tutorials/)

Перейдем к знакомству с Базовым заданием №10
