CREATE TABLE data
(
    id            int unsigned auto_increment,
    caffe_daily   int unsigned not null,
    caffe_goal    int unsigned not null,
    caffe_success boolean   not null,
    cal_daily     int unsigned not null,
    reg_date      timestamp not null default now(),
    money_daily   int unsigned not null,
    sugar_daily   int unsigned not null,
    sugar_goal    int unsigned not null,
    sugar_success boolean   not null,
    user_id       int unsigned not null,
    primary key (id),
    foreign key (user_id) references user (id) on delete cascade
);


CREATE TABLE drink
(
    id           int unsigned auto_increment,
    image        varchar(255),
    drink_name   varchar(20),
    caffeine     int unsigned,
    cal          int unsigned,
    price        int unsigned,
    shot         int unsigned,
    size         varchar(20),
    vol          int unsigned not null,
    sugar        int unsigned,
    whip         boolean not null,
    franchise_id int unsigned not null,
    primary key (id),
    foreign key (franchise_id) references franchise (id) on delete cascade
);

create table franchise
(
    id             int unsigned auto_increment,
    image          varchar(255) not null,
    franchise_name varchar(255),
    primary key (id)
);

create table options
(
    type         varchar(50) not null,
    id           int unsigned auto_increment,
    cal          int unsigned not null,
    price        int unsigned not null,
    sugar        int unsigned,
    caffeine     int unsigned,
    franchise_id int unsigned not null,
    primary key (id),
    foreign key (franchise_id) references franchise (id) on delete cascade
);


create table store
(
    id           int unsigned auto_increment,
    store_name   varchar(100),
    franchise_id int unsigned not null,
    primary key (id),
    foreign key (franchise_id) references franchise (id) on delete cascade
);



create table orders
(
    id            int unsigned auto_increment,
    reg_date      timestamp        default now(),
    caffeine      int unsigned not null default 0,
    cal           int unsigned not null default 0,
    sugar         int unsigned not null default 0,
    price         int unsigned not null,
    shot          int unsigned,
    whip          boolean,
    sugar_content varchar(10)      default 'BASIC',
    syrup         int unsigned,
    vanilla       int unsigned,
    hazelnut      int unsigned,
    caramel       int unsigned,
    is_paid       boolean not null default true,
    is_public     boolean not null default true,
    memo          varchar(500),
    photo         varchar(255),
    order_status  varchar(50),
    store_name    varchar(100),
    drink_id      int unsigned not null,
    store_id      int unsigned,
    user_id       int unsigned not null,
    primary key (id),
    foreign key (drink_id) references drink (id),
    foreign key (store_id) references store (id),
    foreign key (user_id) references user (id) on delete cascade
);



create table user
(
    id            int unsigned auto_increment,
    user_name     varchar(16)  not null,
    member_id     varchar(15)  not null unique,
    password      varchar(255) not null,
    email         varchar(100) not null unique,
    nickname      varchar(16)  not null,
    image         varchar(255) not null,
    caffe_goal    int unsigned not null default 400,
    sugar_goal    int unsigned not null default 25,
    last_updated  TIMESTAMP    NOT NULL,
    auth_id       int unsigned not null,
    refresh_token varchar(200) NOT NULL,
    primary key (id),
    foreign key (auth_id) references authority (id)
);

create table authority
(
    id             int unsigned auto_increment,
    authority_name varchar(50) not null,
    primary key (id)
);